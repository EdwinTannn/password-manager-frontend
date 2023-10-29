import { Component, OnInit } from '@angular/core';
import * as faceapi from 'face-api.js';
import { ApiService } from 'src/app/service/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-recognition',
  templateUrl: './face-recognition.component.html',
  styleUrls: ['./face-recognition.component.scss'],
})
export class FaceRecognitionComponent implements OnInit {
  constructor(
    private service: ApiService,
    private router: Router
    ) {}

  labels: string[] = [];
  username: [] = [];
  message = '';
  validation: boolean | undefined;

  async ngOnInit() {
    this.service.getAllFace().subscribe((res) => {
      for (let i = 0; i < res.length; i ++) {
        this.labels.push(res[i].user_picture);
      }
    });
    const video = document.getElementById('video');
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri('assets/weight'),
      faceapi.nets.faceLandmark68Net.loadFromUri('assets/weight'),
      faceapi.nets.faceRecognitionNet.loadFromUri('assets/weight'),
    ])
      .then(() => this.startWebcam(video))
      .then(() => this.faceRecognition(video));

  }

  // Menyalakan video tag pada html
  startWebcam(video: any) {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // mendapatkan label/nama untuk deteksi wajah
  getLabeledFaceDescriptions() {
    return Promise.all(
      this.labels.map(async (label) => {
        const descriptions: any = [];
        const img = await faceapi.fetchImage(`${label}`); // Lokasi folder
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections?.descriptor);
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    );
  }

  // fungsi untuk deteksi wajah
  async faceRecognition(video: any) {
    const labeledFaceDescriptors = await this.getLabeledFaceDescriptions();
    const faceMatcher: any = new faceapi.FaceMatcher(labeledFaceDescriptors);

    video.addEventListener('playing', () => {
      location.reload();
    });

    const canvas: any = faceapi.createCanvasFromMedia(video);
    canvas.style.position = 'absolute'; // Mengatur posisi canvas atau border deteksi
    canvas.style.left = '0';
    this.insertAfter(video, canvas);

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    let checkFace = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video)
        .withFaceLandmarks()
        .withFaceDescriptors();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

      const results = resizedDetections.map((d) => {
        return faceMatcher.findBestMatch(d.descriptor);
      });

      console.log("results", results)
      

      if (results.length === 0) {
        //empty
      } else {
        if (results[0]._label !== 'unknown') {
          const formData = new FormData();
          this.validation = true;

          formData.append('picture', results[0]._label);

          this.service.getUserByFace(formData).subscribe((res) => {
            this.router.navigate([`dashboard/${res.user_id}`]);
          })

          clearInterval(checkFace);
            navigator.mediaDevices
              .getUserMedia({
                video: true,
                audio: false,
              })
              .then((stream) => {
                stream.getVideoTracks()[0].stop();
                video.srcObject = stream;
              });
        }
        
        else {
          this.validation = false;
          this.message = 'Face Not Recognized';
          console.log("Face is not recognized")
        }
      }
    }, 1000);
  }

  // memasukan canvas(tetapi disini canvas visibility nya hide jadi ga kelihatan)
  insertAfter(referenceNode: any, newNode: any) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
}
