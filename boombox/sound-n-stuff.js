
// Create a new instance of an audio object and adjust some of its properties

// Variables
var prevAvg = 0;
var pHighAvg = 0;
var lspeaker = document.querySelectorAll('#lspeaker')[0];
var rspeaker = document.querySelectorAll('#rspeaker')[0];
var lsTransformBase = lspeaker.getAttribute("transform");
var rsTransformBase = rspeaker.getAttribute("transform");
var running = false;

// Establish all variables that your Analyser will use
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
// Initialize the MP3 player after the page loads all of its HTML into the window
// window.addEventListener("load", initMp3Player, false);

// $(document).ready(function() {
//  currentSVG = '#art0';
//  // animate();

//  $('#beyonce').click(function(event) {
//    if (!loop) {
//      loop = true;
//      $('#loop').css('background-color', 'red').html('Stop');
//      if (!running) {
//        whiteDelay = 3000;
//        // animate();
//      }
//    }
//    else {

//    }
//  });

function initMp3Player(song){
  if (!running) {
    running = true;

    $('#menu').fadeOut('fast', function() {
      $('#beast').css('display', 'block');
      animate(function() {
        var audio = new Audio();
        var bpm = 102;
        audio.src = 'sounds/' + song;
        audio.controls = true;
        audio.loop = true;
        audio.autoplay = true;

        document.getElementById('audio_box').appendChild(audio);
        context = new AudioContext(); // AudioContext object instance
        analyser = context.createAnalyser(); // AnalyserNode method
        // canvas = document.getElementById('analyser_render');
        // ctx = canvas.getContext('2d');
        // Re-route audio playback into the processing graph of the AudioContext
        source = context.createMediaElementSource(audio); 
        source.connect(analyser);
        analyser.connect(context.destination);
        frameLooper();
      });
    });
    
  }
}
// frameLooper() animates any style of graphics you wish to the audio frequency
// Looping at the default frame rate that the browser provides(approx. 60 FPS)
function frameLooper(){
  window.requestAnimationFrame(frameLooper);
  fbc_array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(fbc_array);
  // ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  // ctx.fillStyle = '#00CCFF'; // Color of the bars
  bars = 100;

  var sum = 0;
  var bassSum = 0;
  var highSum = 0;

  for (var i = 0; i < bars; i++) {
    // bar_x = i * 3;
    // bar_width = 2;
    bar_height = -(fbc_array[i] / 2);
    //  fillRect( x, y, width, height ) // Explanation of the parameters below
    // ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);


    // benjis code (sum all of the values)
    if (i < 10) {
      bassSum += fbc_array[i];
    }
    if (i >= 90 && i < 100) {
      highSum += fbc_array[i];
    }
    sum += fbc_array[i];
  }
  var average = sum / bars;
  var diff = prevAvg - average;
  twingSpeaker(diff);
  // if (Math.abs(diff) > 30) {
  //   rippleInnerCircles();
  // }
  prevAvg = average;

  var bassAvg = bassSum / 10;
  if (bassAvg > 200 && !snakeLock) {
    drawSnakes();
  }
  if (bassAvg > 230) {
    rippleInnerCircles();
  }

  var highAvg = highSum / 10;
  var highDiff = highAvg - pHighAvg;
  pHighAvg = highAvg;
  if (Math.abs(highDiff) < 10) {
    twingOuterSpeakers(highDiff / 5);
    twingBigSpeakers(highDiff / 2.5);
  }
}

function twingSpeaker(diff) {
  if (Math.abs(diff) < 10) {
    lspeaker.setAttribute("transform", lsTransformBase + " rotate(" + (2 * diff) + ", 75, 75)");
    rspeaker.setAttribute("transform", rsTransformBase + " rotate(" + (-2 * diff) + ", 75, 75)");
  }
}
