let video = document.createElement("video");
let canvasElement = document.getElementById("canvas");
let canvas
let url = ""

function qrcode() {
    return url
}

function drawLine(begin, end) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 10;
    canvas.lineCap = "round";
    canvas.shadowBlur = 10;
    canvas.shadowOffsetY = 5;
    canvas.shadowColor = "#8eff00";
    canvas.strokeStyle = "#8eff00";
    canvas.stroke();

}

function initScan() {

    console.log('Init scan')

    canvasElement = document.getElementById("canvas");
    canvas = canvasElement.getContext("2d");

    var constraints = {
        video: {
            video: true,
            facingMode: "environment"
        }
    };


    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            video.srcObject = stream;
            //video.setAttribute("playsinline", true);  
            video.play();
            requestAnimationFrame(tick);
        })
        .catch(function (err0r) {
            console.log("Not found device stream media!");
        });
}


function tick() {
    setTimeout(function () {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvasElement.hidden = false;
            canvasElement.height = video.videoHeight;
            canvasElement.width = video.videoWidth;
            canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
            var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
            var code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });
            if (code) {
                url = code.data;
                document.getElementById('eventBT').click()
            }
        }
        requestAnimationFrame(tick);
    }, 500);

}

function stop() {
    const mediaStream = video.srcObject;
    if (mediaStream != null) {
        const tracks = mediaStream.getTracks();
        tracks[0].stop();
        tracks.forEach(track => track.stop())
    }
}


