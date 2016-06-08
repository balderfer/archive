var selectPreset = function(id) {
  var input = document.getElementById("behavior");
  switch (id) {
    case "sinwave":
      input.value = "\
{\n\
  path: function(x) {\n\
    var y = 0;\n\
    y = 50 * Math.sin(x / 100);\n\
    return y;\n\
  },\n\
  speed: function() {\n\
    return 2 + (Math.random() * 4);\n\
  },\n\
  offset: function() {\n\
    return 0;\n\
  },\n\
  backgroundColor: 'white',\n\
  color: function() {\n\
    return 'red';\n\
  },\n\
  size: 10,\n\
  count: 100,\n\
  placement: 'random',\n\
}"
      break;
    case "ocean":
      input.value = "\
{\n\
  path: function(x) {\n\
    var y = 0;\n\
    y = 50 * Math.sin(x / 100);\n\
    return y;\n\
  },\n\
  speed: function() {\n\
    return 2 + (Math.random() * 4);\n\
  },\n\
  offset: function() {\n\
    return (Math.random() * 3) - 1.5;\n\
  },\n\
  backgroundColor: 'rgba(52, 152, 219, 1.0)',\n\
  color: function() {\n\
    var rn = Math.random();\n\
    if (rn < 0.2) {\n\
      return 'rgba(255, 255, 255, 1.0)';\n\
    } else if (rn < 0.4) {\n\
      return 'rgba(255, 255, 255, 0.6)';\n\
    } else if (rn < 0.6) {\n\
      return 'rgba(41, 128, 185,1.0)';\n\
    } else if (rn < 0.8) {\n\
      return 'rgba(26, 188, 156,1.0)';\n\
    } else {\n\
      return 'rgba(46, 204, 113,1.0)';\n\
    }\n\
  },\n\
  size: 3,\n\
  count: 2000,\n\
  placement: 'random'\n\
}"
      break;
    case "blackhole":
      input.value = "\
{\n\
  path: function(x) {\n\
    var y = 0;\n\
    return y;\n\
  },\n\
  speed: function() {\n\
    return 2 + (Math.random() * 4);\n\
  },\n\
  offset: function() {\n\
    return (Math.random() * 2) - 1;\n\
  },\n\
  backgroundColor: 'black',\n\
  color: function() {\n\
    var rn = Math.random();\n\
    if (rn < 0.2) {\n\
      return 'rgba(255, 255, 255, 1.0)';\n\
    } else if (rn < 0.4) {\n\
      return 'rgba(255, 255, 255, 0.6)';\n\
    } else if (rn < 0.6) {\n\
      return 'rgba(255, 255, 255, 0.2)';\n\
    } else if (rn < 0.8) {\n\
      return 'rgba(243, 156, 18, 1.0)';\n\
    } else {\n\
      return 'rgba(243, 156, 18, 0.6)';\n\
    }\n\
  },\n\
  size: 1,\n\
  count: 5000,\n\
  placement: 'random',\n\
  blackHole: {\n\
    x: 0.5,\n\
    y: 0.5,\n\
    radius: 150,\n\
    strength: 0.1\n\
  }\n\
}"
  }
}

var submitBehavior = function() {
  var input = document.getElementById("behavior");
  var form = document.getElementById("form");
  var canvas = document.getElementById("canvas");
  var script = document.createElement("script");
  script.id = "dynamicscript";
  script.type = "text/javascript";
  script.text = "Particles.init('particles');\n" +
                "Particles.behavior(" + input.value + ");" +
                "Particles.start();";
  form.style = "display: none;";
  canvas.style = "display: block;";
  document.body.appendChild(script);
}

var returnToMenu = function() {
  var form = document.getElementById("form");
  var canvas = document.getElementById("canvas");
  var script = document.getElementById("dynamicscript");
  Particles.stop();
  canvas.style = "display: none;";
  form.style = "display: block;";
  document.body.removeChild(script);
}

    // Particles.init('particles');
    // Particles.behavior({
    //   path: function(x) {
    //     var y = 0;
    //     y = 300 + (50 * Math.sin(x / 100));
    //     return y;
    //   },
    //   speed: function() {
    //     return 2 + (Math.random() * 4);
    //   },
    //   offset: function() {
    //     return (Math.random() * 2) - 1;
    //   },
    //   color: function() {
    //     var rn = Math.random();
    //     if (rn < 0.1) {
    //       return 'rgba(255, 255, 255, 1.0)';
    //     } else if (rn < 0.2) {
    //       return 'rgba(255, 255, 255, 0.8)';
    //     } else if (rn < 0.3) {
    //       return 'rgba(255, 255, 255, 0.6)';
    //     } else if (rn < 0.4) {
    //       return 'rgba(255, 255, 255, 0.4)';
    //     } else if (rn < 0.5) {
    //       return 'rgba(255, 255, 255, 0.2)';
    //     } else if (rn < 0.6) {
    //       return 'rgba(243, 156, 18, 1.0)';
    //     } else if (rn < 0.7) {
    //       return 'rgba(243, 156, 18, 0.8)';
    //     } else if (rn < 0.8) {
    //       return 'rgba(243, 156, 18, 0.6)';
    //     } else if (rn < 0.9) {
    //       return 'rgba(243, 156, 18, 0.4)';
    //     } else {
    //       return 'rgba(243, 156, 18, 0.2)';
    //     }
    //   },
    //   count: 5000,
    //   placement: 'random',
    //   blackHole: {
    //     x: 0.5,
    //     y: 0.5,
    //     r: 150
    //   }
    // });
    // Particles.start();
