var audio, context, analyser, source, fbcArray, iteration, currentTime, isRunning, isHype, centralMin;
// Initialize variables for beat detection on different levels.
var genVolume, genThreshold, genDecay, pGenVolume, genThresholdSetTime, genDiffArray;
var bassVolume, bassThreshold, bassDecay, pBassVolume, bassThresholdSetTime, bassDiffArray;
var hypeThreshold = 112;
var hypeDecay = -0.25;
var hypeMultiplier = 0;
isRunning = false;
isHype = false;


var BeatDiff = function(value, volume){
  this.value = value;
  this.volume = volume;
};

var audioLoop = function() {
  iteration++;
  currentTime = context.currentTime;
  fbcArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(fbcArray);
  cleanFbcArray();

  Titus.updateTital();
};

// Remove trailing zeros from end of fbcArray
var cleanFbcArray = function() {
  var i = fbcArray.length - 1;
  for (i; i >= 0; i--) {
    if (fbcArray[i] > 0) break;
  }
  fbcArray = fbcArray.slice(0, i+1);
}

var Titus = {
  getWaveformArray: function() {
    if (isRunning)
      return fbcArray;
    else
      return null;
  },

  getCurrentTime: function() {
    return currentTime;
  },

  getHypeLevel: function() {
    if (isHype)
      return centralMin * hypeMultiplier;
    else
      return 0;
  },

  init: function(pathToSong) {
    isRunning = true;
    this.initAudio(pathToSong);
    this.initBeatData();
    this.createControlPlayer(audio);
    context = new AudioContext();
    analyser = context.createAnalyser();
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);

    iteration = 0;
    var loop = setInterval(function() {
      audioLoop();
    }, 1000 / 60);
  },

  initAudio: function(pathToSong) {
    audio = new Audio();
    audio.src = pathToSong;
    audio.controls = true;
    audio.loop = false;
    audio.autoplay = true;
  },

  initBeatData: function() {
    var decay = -1;
    // General
    genThreshold = 0;
    genDecay = decay;
    pGenVolume = 0;
    genThresholdSetTime = 0;
    genDiffArray = [];
    // Bass
    bassThreshold = 0;
    bassDecay = decay / 50;
    pBassVolume = 0;
    bassThresholdSetTime = 0;
    bassDiffArray = [];
  },

  updateTital: function() {    
    var i = 0;
    var genSum = 0;
    var bassSum = 0;
    centralMin = 256;
    for (i; i < fbcArray.length; i++) {
      // Sum general beats and bass
      genSum += fbcArray[i];
      if (i < fbcArray.length / 48) bassSum += fbcArray[i];
      // Find min for center section
      if (i > fbcArray.length * 0.3 && i < fbcArray.length * 0.7 && fbcArray[i] < centralMin) {
        centralMin = fbcArray[i];
        // console.log(centralMin);
      }
    }

    if (isHype) {
      hypeMultiplier -= hypeDecay / 8;
      if (hypeMultiplier > 6) {
        hypeMultiplier = 6;
      }
      if (hypeMultiplier * centralMin > 780) {
        this.fireEvent('hypeOverload', {'value': centralMin});
      }
    }
    
    if (centralMin === 256) {
      isHype = false;
      hypeMultiplier = 0;
      this.fireEvent('hypeEnd', {'value': centralMin});
    } else if (centralMin >= hypeThreshold && !isHype) {
      hypeThreshold = centralMin;
      isHype = true;
      this.fireEvent('hypeStart', {'value': centralMin});
    } else if (isHype && centralMin < 5) {
      isHype = false;
      hypeMultiplier = 0;
      this.fireEvent('hypeEnd', {'value': centralMin});
    } else {
      hypeThreshold += hypeDecay;
    }

    // Detect general beat
    genVolume = genSum / fbcArray.length;
    this.detectBeat(genVolume, genThreshold, genDecay, pGenVolume, genThresholdSetTime, genDiffArray, function(genDetectionResults) {
      genThreshold = genDetectionResults[3];
      pGenVolume = genDetectionResults[4];
      genThresholdSetTime = genDetectionResults[5];
      genDiffArray = genDetectionResults[6];
      if (genDetectionResults[0] && genDetectionResults[1]) {
        this.fireEvent('beat', {'value': genDetectionResults[6]});
      }
    }.bind(this));
    // Detect bass beat
    bassVolume = bassSum / fbcArray.length;
    this.detectBeat(bassVolume, bassThreshold, bassDecay, pBassVolume, bassThresholdSetTime, bassDiffArray, function(bassDetectionResults) {
      bassThreshold = bassDetectionResults[3];
      pBassVolume = bassDetectionResults[4];
      bassThresholdSetTime = bassDetectionResults[5];
      bassDiffArray = bassDetectionResults[6];
      if (bassDetectionResults[0] && bassDetectionResults[1]) {
        this.fireEvent('bass', {'value': bassDecay[2]});
      }
    }.bind(this));
  },

  detectBeat: function(beatVolume, beatThreshold, beatDecay, pBeatVolume, beatThresholdSetTime, beatDiffArray, cb) {
    // console.log('detectBeat');
    var beatDiff = Math.abs(context.currentTime - beatThresholdSetTime);
    var beatDetected = false;
    var results = [false, null];
    // console.log('beatVolume: ' + beatVolume);
    // console.log('beatThreshold: ' + beatThreshold);
    if (beatVolume > beatThreshold && beatVolume < pBeatVolume && beatDiff >= (60 / 180)) {
      beatDetected = true;
      beatDiffArray.push(new BeatDiff(beatDiff, pBeatVolume));
      results = this.verifyBeat(beatDiffArray);
      if (results[0]) {
        beatThreshold = pBeatVolume;
        beatThresholdSetTime = currentTime;
      }
    } else {
      beatThreshold += beatDecay;
    }
    pBeatVolume = beatVolume;
    cb([beatDetected, results[0], results[1], beatThreshold, pBeatVolume, beatThresholdSetTime, beatDiffArray]);
  },

  verifyBeat: function(beatDiffArray) {
    var currentIndex = beatDiffArray.length - 1;
    if (currentIndex < 0) currentIndex = 0;
    var shouldFireBeatEvent = false;
    var epsilon = 0.1;
    var totalAverageVolume = 0;
    for (var i = 0; i < currentIndex; i++) {
      var current = beatDiffArray[currentIndex];
      var past = beatDiffArray[i];
      var avgValue = (current.value + past.value) / 2;
      var avgVolume = (current.volume + past.volume) / 2;
      totalAverageVolume += current.volume;
      // totalAverageVolume * ((i - 1) / i); // Not sure what this is for @Scott
      if (Math.abs(current.value - past.value) < epsilon * avgValue
          || Math.abs(current.volume - past.volume) < epsilon * avgVolume) {
        shouldFireBeatEvent = true;
        break;
      }
    }
    return [shouldFireBeatEvent, avgValue];
  },

  fireEvent: function(eventType, data) {
    var event = new CustomEvent(eventType);
    document.dispatchEvent(event);
  },

  createControlPlayer: function(audio) {
    document.getElementById('titus-controls').appendChild(audio);
  }
};
