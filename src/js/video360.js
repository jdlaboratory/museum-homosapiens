(function(window, videojs) {
    var player = window.player = videojs('videojs-vr-player');
    player.mediainfo = player.mediainfo || {};
    player.mediainfo.projection = '360';

    // AUTO is the default and looks at mediainfo
    var vr = window.vr = player.vr({projection: 'AUTO', debug: true, forceCardboard: false});
  }(window, window.videojs));