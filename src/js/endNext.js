const vid = document.querySelector(".video-js");
const nextBtn = document.querySelector(".content-nav span:last-child");

var player = videojs(vid);

player.on('ended', function() {
  nextBtn.classList.add("active");
});