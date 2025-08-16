const player = document.querySelector(".player");
const video = player.querySelector("video");
const playIcon = player.querySelector(".player__button");
const skipButtons = player.querySelectorAll("[data-skip]");
const rangeUpdates = player.querySelectorAll("input[type = 'range']");
const currentProgress = player.querySelector(".progress__filled");
const progressBar = player.querySelector(".progress");

function togglePlay(){
    video.paused?video.play():video.pause();
}

function updateIcon(){
    playIcon.textContent = video.paused? '►' : '❚ ❚';
}

function skip(){
    console.log(video.currentTime);
    video.currentTime += parseFloat(this.dataset.skip);
    console.log(video.currentTime);
}

function updateRanges(){
    video[this.name] = this.value;
}

function handleProgress(){
    const elapsedPercent = (video.currentTime / video.duration) * 100;
    currentProgress.style.flexBasis = `${elapsedPercent}%`;
}

function seek(e){
    console.log("here");
    const seekTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = seekTime;
}

video.addEventListener("click",togglePlay);
playIcon.addEventListener("click",togglePlay);
video.addEventListener("play", updateIcon);
video.addEventListener("pause", updateIcon);
skipButtons.forEach(button => button.addEventListener("click", skip));
rangeUpdates.forEach(range => range.addEventListener("change", updateRanges));
video.addEventListener("timeupdate", handleProgress);

let mouseDown = false;
progressBar.addEventListener("click", seek);
progressBar.addEventListener("click", (e) => mouseDown && seek(e));
progressBar.addEventListener("mousedown", ()=>mouseDown = true);
progressBar.addEventListener("mouseup", ()=>mouseDown = false);
