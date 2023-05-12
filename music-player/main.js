//JS for Music Player
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music - array using object, name is for img and audio element
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

//Check if playing using a boolean
let isPlaying = false;

// Play song using a function
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause song using a function
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener -Ternary Operator
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//Function to add the playlist items to the DOM and update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

//Previous song - decrement index increasing value by 1
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//Next song - increment index increasing value by 1
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Control current song using a variable
let songIndex = 0;

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time using a function
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Update progress bar width using percentage using template string
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Mathfloor to calculate dispay for duration divided by 60 to get amount of mins

     const durationMinutes = Math.floor(duration / 60);

     // Calculate display for duration 60s to be used as remainder with Mathfloor
     let durationSeconds = Math.floor(duration % 60);

     //If statement to change seconds to start with 0 
     if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

     // Delay switching the duration Element to avoid NaN - not a number using template string
     if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
     }
      // Calculate dispay for current time using Mathfloor
     const currentMinutes = Math.floor(currentTime / 60);

     // Remainder to calculate anything left after 60s to be used as remainder with Mathfloor
     let currentSeconds = Math.floor(currentTime % 60);

     //If statement to change seconds to start with 0 
     if (currentSeconds < 10) {
       currentSeconds = `0${currentSeconds}`;
     }
     currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

//Set progress bar with a function
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
 }

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong)
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);