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
  interval: null,

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
    this.backgroundColor = options.backgroundColor;
    this.size = options.size;
  },

  constructParticle: function(x, speed) {
    var offset = this.offsetFunction();
    if (this.blackHole) {
      var bhx = Particles.width * Particles.blackHole.x;
      var bhy = Particles.height * Particles.blackHole.y;

      var maxDiag, tbhx, tbhy;
      if (Particles.blackHole.x < 0.5) {
        tbhx = Particles.width - bhx;
      } else {
        tbhx = bhx;
      }
      if (Particles.blackHole.y < 0.5) {
        tbhy = Particles.height - bhy;
      } else {
        tbhy = bhy;
      }
      maxDiag = Math.sqrt(tbhx*tbhx + tbhy*tbhy);

      offset *= Math.sqrt(maxDiag*maxDiag - Math.pow(bhx - x, 2));
    } else {
      offset *= this.height / 2;
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
        return Math.random() * (this.width + (this.padding * 2)) - this.padding;
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
    this.interval = window.setInterval(function() {
      Particles.update();
    }, 1000 / this.refreshRate);
  },

  stop: function() {
    window.clearInterval(this.interval);
    this.pArray = [];
  },

  update: function() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0, 0, this.width, this.height);
    
    if (Particles.blackHole) {
      var bhx = Particles.width * Particles.blackHole.x;
      var bhy = Particles.height * Particles.blackHole.y;
      var radius = this.blackHole.radius;
      // this.context.beginPath();
      // this.context.arc(bhx, bhy, radius, 0, 2 * Math.PI, false);
      // this.context.fillStyle = 'rgba(44, 62, 80, 1.0)';
      // this.context.fillStyle = 'red';
      // this.context.fill();


      var maxDiag, tbhx, tbhy;
      if (Particles.blackHole.x < 0.5) {
        tbhx = Particles.width - bhx;
      } else {
        tbhx = bhx;
      }
      if (Particles.blackHole.y < 0.5) {
        tbhy = Particles.height - bhy;
      } else {
        tbhy = bhy;
      }
      maxDiag = Math.sqrt(tbhx*tbhx + tbhy*tbhy);
    }
    
    // TODO: draw based on initialized style
    for (var i = 0; i < this.pArray.length; i++) {
      this.pArray[i].x += this.pArray[i].speed;
      var tempY = drawBlackSquare(this.pArray[i]);
      
      if (this.blackHole) {
        var dx = this.pArray[i].x - bhx;
        var dy = tempY - bhy;
        var delta = Math.sqrt(dx*dx + dy*dy);

        if (delta > maxDiag && dx > 0) {
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
  var tempY = Particles.path(p.x) + p.offset + (Particles.height / 2);

  if (Particles.blackHole) {
    var bhx = Particles.width * Particles.blackHole.x;
    var bhy = Particles.height * Particles.blackHole.y;
    var radius = Particles.blackHole.radius;
    var strength = Particles.blackHole.strength; 

    var deltaX = tempX - bhx;
    var deltaY = tempY - bhy;
    var delta = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
    var theta = Math.atan2(deltaY, deltaX);

    if (delta < (radius * 4)) {
      delta = (delta * 3/4) + radius;
      tempX = (Math.cos(theta) * delta) + bhx;
      tempY = (Math.sin(theta) * delta) + bhy;
    }

    var diff = delta - radius;
    if (diff < 1) diff = 1;
    // var deltam = Math.pow(((radius - (radius * 0.1)) / diff), 4) + radius * 0.1;
    var deltam = (radius * strength) + (radius / delta) * (radius * (1 - strength));
    var xm = (Math.cos(theta + Math.PI) * deltam) + bhx;
    var ym = (Math.sin(theta + Math.PI) * deltam) + bhy;
    Particles.context.fillRect(xm, ym, Particles.size, Particles.size);
    
  }

  Particles.context.fillRect(tempX, tempY, Particles.size, Particles.size);
  return tempY;
};
