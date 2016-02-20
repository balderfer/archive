var Shapify = {
  
  constants: {
    canvas: null,
    context: null,
    data: null,
    delay: 1000
  },

  // Initialize the canvas and context and call processImage()
  init: function() {

    this.constants.canvas = document.getElementById("shapify");
    this.constants.context = this.constants.canvas.getContext("2d");
    this.initImage();

  },

  // Resize the canvas using the width and height given
  resizeCanvas: function(width, height) {

    this.constants.canvas.width = width;
    this.constants.canvas.height = height;

  },

  // Initialize the image objext, and return the data
  initImage: function() {

    var that = this;
    var imageObj = new Image();

    imageObj.onload = function() {
      that.resizeCanvas(imageObj.width, imageObj.height);
      that.constants.context.drawImage(imageObj, 0, 0);
      var imageData = that.constants.context.getImageData(0, 0, imageObj.width, imageObj.height);
      
      that.constants.data = imageData.data;
      that.processImage();
    }

    imageObj.src = '../assets/images/cover.jpg';

  },

  blurImage: function(data, increment) {
  
    var i = 0;
    var rTotal = 0;
    var gTotal = 0;
    var bTotal = 0;
    var lineCount = 0;
    for (i; i < data.length; i += 4) {
      if (!(i % 1000)) {
        this.constants.context.fillStyle = "rgba("+Math.round(rTotal/1000)+","+Math.round(gTotal/1000)+","+Math.round(bTotal/1000)+",1)";
        this.constants.context.fillRect(0, lineCount, 1000, 1);
        lineCount++;
        rTotal = 0;
        gTotal = 0;
        bTotal = 0;
      }
      rTotal += data[i];
      gTotal += data[i+1];
      bTotal += data[i+2];
    }

  },

  rgbToCmyk: function(r, g, b) {
    rnot = r /255;
    gnot = g /255;
    bnot = b /255;

    var k = 1 - Math.max(rnot, gnot, bnot);
    var c = (1 - rnot - k) / (1 - k);
    var m = (1 - gnot - k) / (1 - k);
    var y = (1 - bnot - k) / (1 - k);
    return [c,m,y,k];
  },

  insertShapes: function(x, y, r, red, green, blue) {
    // console.log(x + ", " + y + ", " + r);

    var cmyk = this.rgbToCmyk(red, green, blue);
    // console.log(cmyk);

    var scale = 1 / (cmyk[0] + cmyk[1] + cmyk[2] + cmyk[3]);

    for (var i = 0; i < 2; i++) {
      var randX = Math.random() * r * 1.5 + x - r;
      var randY = Math.random() * r * 1.5 + y - r;
      var rand = Math.random();
      if (rand < cmyk[3] - 0.4) {
        rand = Math.random();
        if (rand < 0.33) {
          this.constants.context.fillStyle = "rgba(0, 255, 255, 1)";
        } else if (rand < 0.67) {
          this.constants.context.fillStyle = "rgba(255, 0, 255, 1)";
        } else {
          this.constants.context.fillStyle = "rgba(255, 255, 0, 1)";
        }
        this.constants.context.beginPath();
        this.constants.context.arc(randX, randY, 10, 0, 2 * Math.PI, false);
        this.constants.context.fill();
      } else {
        // this.constants.context.fillStyle = "rgba(255, 255, 255, 1)";
        // this.constants.context.fillRect(randX, randY, 5, 5);
      }
    }

  },

  blurBlock: function(x, y, w, h, increment) {
    var data = this.constants.data;

    var totals = [0, 0, 0];
    var count = 0;

    var j = y;
    var i = x;

    for (j; j < y + h; j++) {
      for (i; i < x + w; i+=4) {
        totals[0] += data[i + (y * w * increment)];
        totals[1] += data[i + (y * w * increment) + 1];
        totals[2] += data[i + (y * w * increment) + 2];

        count++;
      }
    }
    
    var context = this.constants.context;

    // context.fillStyle = "rgba("+Math.round(totals[0]/count)+","+Math.round(totals[1]/count)+","+Math.round(totals[2]/count)+",1)";
    // context.fillRect(x/4, y, w, h);
    this.insertShapes((x + (w / 2)) / 4, y + (h / 2), h, totals[0]/count, totals[1]/count, totals[2]/count)

  },

  pixilizeImage: function(w, h, increment) {

    this.constants.context.fillStyle = "rgba(255,255,255,1)";
    this.constants.context.fillRect(0, 0, w, h);
  
    // var data = this.constants.data;
    w *= 4;
    var i = 0;
    var j = 0;
    while (i <= w && j < h) {
      if (i == w) {
        i = 0;
        j += h / increment;
      } else {
        this.blurBlock(i, j, w / increment, h / increment, increment);
        i += w / increment;
      }
    }

  },

  processImage: function() {
    var that = this;
    this.pixilizeImage(1500, 1000, 50);
    // window.setTimeout(function() {
    //   that.pixilizeImage(1000, 1000, 50);
    // }, 1000);
    // window.setTimeout(function() {
    //   that.pixilizeImage(1000, 1000, 25);
    // }, 2000);
    // window.setTimeout(function() {
    //   that.pixilizeImage(1000, 1000, 10);
    // }, 3000);
    // window.setTimeout(function() {
    //   that.pixilizeImage(1000, 1000, 5);
    // }, 4000);

  }

}