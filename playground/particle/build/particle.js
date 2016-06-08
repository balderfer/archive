var Particles = {
  
  canvas: null,
  context: null,
  width: window.innerWidth,
  height: window.innerHeight,
  padding: 500,
  refreshRate: 30,
  pArray: [],
  path: null,
  speedFunction: null,
  particleCount: 0,
  offsetFunction: 0,
  blackHole: null,
  colorFunction: null,

  init: function(canvasId, options) {
    if (!canvasId) {
      console.err("No canvas ID provided.\nex. Particles.init('particles');");
    }

    if (options) {
      if (options.width) this.width = options.width;
      if (options.height) this.height = options.height;
      if (options.refreshRate) this.refreshRate = options.refreshRate;
    }

    this.initCanvas(canvasId);
  },

  initCanvas: function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");
  },

  behavior: function(options) {
    this.path = options.path;
    this.speedFunction = options.speed;
    this.particleCount = options.count;
    this.offsetFunction = options.offset;
    this.particlePlacement = options.placement;
    this.blackHole = options.blackHole;
    this.colorFunction = options.color;
  },

  constructParticle: function(x, speed) {
    var offset = this.offsetFunction();
    if (this.blackHole) {
      var bhx = Particles.width * Particles.blackHole.x;
      var bhy = Particles.height * Particles.blackHole.y;
      var maxDiag = Math.sqrt(bhx*bhx + bhy*bhy);
      offset *= Math.sqrt(maxDiag*maxDiag - Math.pow(bhx - x, 2));
    }

    return {
      x: x,
      speed: this.speedFunction(),
      offset: offset,
      color: this.colorFunction()
    };
  },

  initParticles: function(cb) {
    for (var i = 0; i < this.particleCount; i++) {
      this.pArray[i] = this.constructParticle(this.initX(i));
    }
    cb();
  },

  initX: function(i) {
    switch (this.particlePlacement) {
      case 'random':
        return Math.random() * this.width;
      case 'linear':
      default:
        return i * (this.width / this.particleCount);
    }
  },

  start: function() {
    this.initParticles(function() {
      Particles.startLoop();
    });
  },

  startLoop: function() {
    var interval = window.setInterval(function() {
      Particles.update();
    }, 1000 / this.refreshRate);
  },

  update: function() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = 'rgba(44, 62, 80, 1.0)';
    this.context.fillRect(0, 0, this.width, this.height);
    // TODO: draw based on initialized style
    for (var i = 0; i < this.pArray.length; i++) {
      this.pArray[i].x += this.pArray[i].speed;
      var tempY = drawBlackSquare(this.pArray[i]);
      
      if (this.blackHole) {
        var bhx = Particles.width * Particles.blackHole.x;
        var bhy = Particles.height * Particles.blackHole.y;
        var radius = this.blackHole.r;
        // this.context.beginPath();
        // this.context.arc(bhx, bhy, radius, 0, 2 * Math.PI, false);
        // this.context.fillStyle = 'rgba(44, 62, 80, 1.0)';
        // this.context.fillStyle = 'red';
        // this.context.fill();

        var dx = this.pArray[i].x - bhx;
        var dy = tempY - bhy;
        var delta = Math.sqrt(dx*dx + dy*dy);
        var maxDiag = Math.sqrt(bhx*bhx + bhy*bhy);
        if (delta >= maxDiag) {
          this.pArray[i].x = bhx - Math.abs(dx);
        }

      } else {
        if (this.pArray[i].x > this.width + this.padding) {
          this.pArray[i].x = 0 - this.padding;
        }
      }
    }

  }
};

var drawBlackSquare = function(p) {
  Particles.context.fillStyle = p.color;
  var tempX = p.x;
  var tempY = Particles.path(p.x) + p.offset;

  if (Particles.blackHole) {
    var bhx = Particles.width * Particles.blackHole.x;
    var bhy = Particles.height * Particles.blackHole.y;
    var radius = Particles.blackHole.r;

    var deltaX = tempX - bhx;
    var deltaY = tempY - bhy;
    var delta = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
    var theta = Math.atan2(deltaY, deltaX);

    if (delta < (radius * 2)) {
      delta = (delta / 2) + radius;
      tempX = (Math.cos(theta) * delta) + bhx;
      tempY = (Math.sin(theta) * delta) + bhy;
    }

    var diff = delta - radius;
    if (diff < 1) diff = 1;
    var breakPoint = 0.1;
    // var deltam = Math.pow(((radius - (radius * 0.1)) / diff), 4) + radius * 0.1;
    var deltam = (radius * breakPoint) + (radius / delta) * (radius * (1 - breakPoint));
    var xm = (Math.cos(theta + Math.PI) * deltam) + bhx;
    var ym = (Math.sin(theta + Math.PI) * deltam) + bhy;
    Particles.context.fillRect(xm, ym, 1, 1);
    
  }

  Particles.context.fillRect(tempX, tempY, 1, 1);
  return tempY;
};
