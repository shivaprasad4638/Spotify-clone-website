
// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let masterSongCover = document.getElementById('masterSongCover');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "On & On", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", coverPath: "https://placehold.co/150x150" },
    { songName: "Invincible", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", coverPath: "https://placehold.co/150x150" },
    { songName: "Mortals", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", coverPath: "https://placehold.co/150x150" },
    { songName: "Shine", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", coverPath: "https://placehold.co/150x150" },
    { songName: "Why We Lose", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", coverPath: "https://placehold.co/150x150" },
    { songName: "Sky High", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", coverPath: "https://placehold.co/150x150" },
    { songName: "Symbolism", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", coverPath: "https://placehold.co/150x150" },
    { songName: "Heroes Tonight", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", coverPath: "https://placehold.co/150x150" },
    { songName: "Feel Good", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", coverPath: "https://placehold.co/150x150" },
    { songName: "My Heart", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", coverPath: "https://placehold.co/150x150" },
];

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Progressbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("songItemPlay")[0].addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = i;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        masterSongCover.src = songs[songIndex].coverPath;
        document.querySelector('.container').style.backgroundImage = `url('${songs[songIndex].coverPath}')`;
        // Ensure background covers the container properly
        document.querySelector('.container').style.backgroundSize = "cover";
        document.querySelector('.container').style.backgroundPosition = "center";
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongCover.src = songs[songIndex].coverPath;
    document.querySelector('.container').style.backgroundImage = `url('${songs[songIndex].coverPath}')`;
    document.querySelector('.container').style.backgroundSize = "cover";
    document.querySelector('.container').style.backgroundPosition = "center";
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongCover.src = songs[songIndex].coverPath;
    document.querySelector('.container').style.backgroundImage = `url('${songs[songIndex].coverPath}')`;
    document.querySelector('.container').style.backgroundSize = "cover";
    document.querySelector('.container').style.backgroundPosition = "center";
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
