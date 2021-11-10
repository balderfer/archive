
var prevAvg = 0;
var pHighAvg = 0;
var lspeaker = document.querySelectorAll('#lspeaker')[0];
var rspeaker = document.querySelectorAll('#rspeaker')[0];
var lsTransformBase = lspeaker.getAttribute("transform");
var rsTransformBase = rspeaker.getAttribute("transform");
var running = false;
var hypeInterval;

function twingSpeaker(diff) {
  if (Math.abs(diff) < 10) {
    lspeaker.setAttribute("transform", lsTransformBase + " rotate(" + (2 * diff) + ", 75, 75)");
    rspeaker.setAttribute("transform", rsTransformBase + " rotate(" + (-2 * diff) + ", 75, 75)");
  }
}

var startTitus = function(fileName) {
  $('#menu').fadeOut('fast', function() {
    $('#beast').css('display', 'block');
    animate(function() {
      Titus.init('archive/sounds/' + fileName, false);
    });
  });
}

$(document).ready(function() {
  document.addEventListener('beat', function(e) {
    // $('#beast').css('opacity', 0.1);
    // window.setTimeout(function() {
    //   $('#beast').css('opacity', 1);
    // }, 100);
    console.log('beat: XXX, bass: [ ]');
    drawDecorations();
  });
  document.addEventListener('bass', function(e) {
    console.log('beat: [ ], bass: XXX');
    rippleInnerCircles();
  });
  document.addEventListener('hypeStart', function(e) {
    var boombox = document.querySelectorAll('#beast')[0];
    boombox.className = 'animated infinite wobble';
    hypeInterval = setInterval(function() {
      var diff = Titus.getHypeLevel() / 20;
      twingBigSpeakers(-diff);
      twingOuterSpeakers(-diff);
      drawSnakes();
    }, 1000/60);
  });
  document.addEventListener('hypeEnd', function(e) {
    var boombox = document.querySelectorAll('#beast')[0];
    boombox.className = '';
    clearInterval(hypeInterval);
    twingBigSpeakers(0);
    twingOuterSpeakers(0);
  });
});
