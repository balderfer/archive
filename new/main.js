window.onload = function() {
  var canvas = document.getElementById("particles");

  console.log(canvas);

  Particles.init('particles', {
    width: canvas.offsetWidth,
    height: canvas.offsetHeight
  });
  Particles.behavior({
    path: function(x) {
      var y = 0;
      y = 50 * Math.sin(x / 100);
      return y;
    },
    speed: function() {
      return 2 + (Math.random() * 4);
    },
    offset: function() {
      return (Math.random() * 3) - 1.5;
    },
    backgroundColor: 'yellow',
    color: function() {
      var rn = Math.random();
      if (rn < 0.2) {
        return 'rgba(0, 0, 0, '+rn+')';
      } else {
        return 'rgba(255, 255, 255, '+rn+')';
      }
    },
    size: 5,
    count: 500,
    placement: 'random'
  });
  Particles.start();
};