document.addEventListener('DOMContentLoaded', () => {

  // NAV MENU
  function toggleMenu() {
    document.getElementById('navList').classList.toggle('show');
  }
  window.toggleMenu = toggleMenu; // expose globally if used in HTML

  // CLOCK
  const clock = document.getElementById('neon-clock');

  function updateClock() {
    if (!clock) return; // safety check
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    const strHours = hours < 10 ? '0'+hours : hours;
    const strMinutes = minutes < 10 ? '0'+minutes : minutes;
    const strSeconds = seconds < 10 ? '0'+seconds : seconds;

    clock.innerHTML = `${strHours}<span class="colon">:</span>${strMinutes}<span class="colon">:</span>${strSeconds} ${ampm}`;
  }

  setInterval(updateClock, 1000);
  updateClock();

  // VIDEO PLAYER
  const videoFiles = [
    "videos/anim.mp4",
    "videos/blenderanim.mp4",
    "videos/donut_animation.mp4",
    "videos/eg1.mp4",
    "videos/Fire.mp4",
    "videos/Graph.mp4",
    "videos/LetterByLetterWithSound.mp4",
    "videos/rac.mp4",
    "videos/RiemannExample.mp4",
    "videos/svg.mp4",
    "videos/Updaters.mp4",
    "videos/slope.mp4",
    "videos/ValueTrackers.mp4"
  ];

  let currentIndex = 0;
  const player = document.getElementById("videoPlayer");

  function loadVideo(index) {
    currentIndex = index;
    player.innerHTML = `<source src="${videoFiles[currentIndex]}" type="video/mp4">`;
    player.load();
    player.play();
  }

  function nextVideo() {
    const nextIndex = (currentIndex + 1) % videoFiles.length;
    loadVideo(nextIndex);
  }

  function prevVideo() {
    const prevIndex = (currentIndex - 1 + videoFiles.length) % videoFiles.length;
    loadVideo(prevIndex);
  }

  // Auto-play next when current ends
  if (player) player.addEventListener("ended", nextVideo);

  // expose next/prev to buttons
  window.nextVideo = nextVideo;
  window.prevVideo = prevVideo;

});
