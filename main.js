song = "";
leftWristscore = 0;
rightWristscore = 0;
left_wrist_x = 0;
left_wrist_Y = 0;
right_wrist_x = 0;
right_wrist_y = 0;

function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(500, 500);
    canvas.position(530, 190);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function modelLoaded(){
    console.log("Posenet is Initialized!");
}
function draw(){
    image(video, 0, 0, 500, 500);
    fill("#FF0000");
    stroke("#FF0000");
    circle(right_wrist_x, right_wrist_y, 20);
    if(rightWristscore > 0.2){
    if(right_wrist_y > 0 && right_wrist_y <= 100){
        document.getElementById("speed").innerHTML = "Speed: .5x";
        song.rate(0.5);
    }
    else if(right_wrist_y > 100 && right_wrist_y <= 200){
        document.getElementById("speed").innerHTML = "Speed: 1x";
        song.rate(1);
    }
    else if(right_wrist_y > 200 && right_wrist_y <= 300){
        document.getElementById("speed").innerHTML = "Speed: 1.5x";
        song.rate(1.5);
    }
    else if(right_wrist_y > 300 && right_wrist_y <= 400){
        document.getElementById("speed").innerHTML = "Speed: 2x";
        song.rate(2);
    }
    else if(right_wrist_y > 400 && right_wrist_y <= 500){
        document.getElementById("speed").innerHTML = "Speed: 2.5x";
        song.rate(2.5);
    }
}
    if (leftWristscore > 0.2){
        circle(left_wrist_x, left_wrist_Y, 20);
        InNumberLeftWristY = Number(InNumberLeftWristY);
        remove_decimals = Math.floor(InNumberLeftWristY);
        volume = remove_decimals/500;
        song.setVolume(volume);
        document.getElementById("volume_label").innerHTML = "Volume = " + volume;
    }
}
function press(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristscore = results[0].pose.keypoints[9].score;
        console.log("Score of left wrist is " + leftWristscore);
        rightWristscore = results[0].pose.keypoints[10].score;
        console.log("Score of Right Wrist is " + rightWristscore);

        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_Y = results[0].pose.leftWrist.y;
        console.log("Left Wrist X is " + left_wrist_x + "left wrist Y is " + left_wrist_Y);

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("Right Wrist x is " + right_wrist_x + "right wrist y is " + right_wrist_y);
    }
}