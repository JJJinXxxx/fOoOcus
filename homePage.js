/**
 * Face recognition to detect user's emotion
 * and check if the user is concentrated
 */
var app = new Vue({
    el: '#app',
    data: function() {
        return { visible: false }
    }
    })

var isHere = true;
var isConcentrated = true;
const video = document.createElement("video");
var mediaStream;

function activeIt(){
  navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.autoplay = true;
  video.srcObject = stream;
  mediaStream = stream;
  video.addEventListener('play',()=>{
      const displaySize = {width: video.videoWidth,height:video.videoHeight};
      const canvas = faceapi.createCanvasFromMedia(video);
      setInterval(async () => {
        const detections=await faceapi.detectAllFaces(video,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections,displaySize);
        canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
        // Check whether webcam can capture faces
        if(resizedDetections && Object.keys(resizedDetections).length > 0){
            isHere = true;
            // Get user emotions
            const expressions = resizedDetections[0].expressions;
            const maxValue = Math.max(...Object.values(expressions));
            const emotionArray = Object.keys(expressions).filter(
                item => expressions[item] === maxValue
            );
            const emotion = emotionArray[0];
            // Get user landmarks
            const landmarks = resizedDetections[0].landmarks;
            const jaw = getTop(landmarks.getJawOutline());
            const nose = new Array(landmarks.getNose()[3].x,landmarks.getNose()[3].y);
            const mouth = getMidPos(landmarks.getMouth());
            const leftEyeBbrow = landmarks.getLeftEyeBrow();
            const leftPupil = getMidPos(leftEyeBbrow);
            const rightEyeBrow = landmarks.getRightEyeBrow();
            const rightPupil = getMidPos(rightEyeBrow);
            const distLeftX = Math.abs(nose[0]-leftPupil[0]);
            const distRightX = Math.abs(nose[0]-rightPupil[0]);
            const distLeftY = Math.abs(nose[1]-leftPupil[1]);
            const distRightY = Math.abs(nose[1]-rightPupil[1]);
            const absDisX = Math.abs(distLeftX-distRightX);
            const absDisY = Math.abs(distLeftY-distRightY);
            isConcentrated = absDisX <= 33 && absDisY <= 9;
            console.log("Everything works");
        }else{
            // Unable to detect users
            isHere=false; 
        }
        
      },100)
  })
});}

function getTop(arr){
    var yMin = -1;
    for(var index = 0; index < arr.length; index++){
        yMin = Math.min(yMin,arr[index].y);
    }
    return yMin;
}

function getMidPos(arr){
    var xSum = 0;
    var ySum = 0;
    for(var index = 0; index < arr.length; index++){
        xSum = xSum+arr[index].x;
        ySum = ySum+arr[index].y;
    }
    return new Array(xSum/arr.length,ySum/arr.length);
}

var startMo = document.getElementById("startMonitor");
var stopMo = document.getElementById("stopMonitor");
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    faceapi.nets.ageGenderNet.loadFromUri("/models")
]).then(
    startMo.addEventListener('click',function(){
        activeIt();
    }),
    stopMo.addEventListener('click',function(){
        if(mediaStream.active = true){
            mediaStream.getTracks()[0].stop();
    }})
)
