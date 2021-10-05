const vid = document.querySelector(".video-js");
const nextBtn = document.querySelector(".content-nav span:last-child a");

var player = videojs(vid);

player.on('ended', function() {
  console.log("Next Level");
  window.location.href = nextBtn.href;
});