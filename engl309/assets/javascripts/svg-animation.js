// var currentTime = 0;
var parentSelector = "";
var currentSVG = "";
var colors = ['#FFFFFF', '#F1C40F', '#E67E22', '#E74C3C', '#9B59B6', '#3498DB', '#34495E'];
var whiteDelay = 0;
var loop = true;
var running = false;

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var getSelector = function(selector) {
  return document.querySelectorAll(currentSVG + ' ' + parentSelector + ' ' + selector);
}

var drawLine = function(s, delay, speed) {
  var selector = getSelector(s)[0];
  var clone = selector.cloneNode(true);
  clone.setAttribute('data-iteration', 0);
  clone.removeAttribute('style');
  clone.style.display = 'none';
  insertAfter(clone, selector);
  draw(clone, delay, speed);
  window.setTimeout(function() {
    selector.parentNode.removeChild(selector);
  }, delay+speed);
}


var drawLines = function(s, delay, pause, speed) {
  el = getSelector(s);
  var iterator = 0;
  [].forEach.call(el, function(selector) {
    var clone = selector.cloneNode(true);
    clone.setAttribute('data-iteration', 0);
    clone.removeAttribute('style');
    clone.style.display = 'none';
    insertAfter(clone, selector);
    draw(clone, delay + (pause*iterator), speed);
    window.setTimeout(function() {
      selector.parentNode.removeChild(selector);
    }, delay+(pause*iterator)+speed);
    iterator++;
  })
}

var draw = function(selector, delay, speed) {
  var iteration = parseInt(selector.getAttribute('data-iteration'));
  if (!iteration) iteration = 0;

  selector.setAttribute('stroke', colors[iteration]);
  
  if (iteration < 6) {
    var clone = selector.cloneNode(true);
    clone.setAttribute('data-iteration', iteration+1);
    insertAfter(clone, selector);
    if (iteration == 0) var newDelay = delay+whiteDelay;
    else var newDelay = delay+100;
    draw(clone, newDelay, speed);
  }

  delay /= 1;
  speed /= 1;
  speed /= 1000;
  var length = 0;
  if (selector.tagName === 'rect') {
    length = selector.getAttribute('width')*2 + selector.getAttribute('height')*2;
  }
  else if (selector.tagName === 'circle') {
    length = Math.PI * 2 * selector.getAttribute('r');
  }
  else if (selector.tagName === 'line') {
    var x1 = selector.getAttribute('x1');
    var y1 = selector.getAttribute('y1');
    var x2 = selector.getAttribute('x2');
    var y2 = selector.getAttribute('y2');
    length =  Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
  }
  else if (selector.tagName === 'path') {
    length = selector.getTotalLength();
  }
  window.setTimeout(function() {
    selector.style.display = "block";
    selector.style.transition = selector.style.WebkitTransition = 'none';
    selector.style.strokeDasharray = length + ' ' + length;
    selector.style.strokeDashoffset = length;
    selector.getBoundingClientRect();
    selector.style.transition = selector.style.WebkitTransition = 'stroke-dashoffset ' + speed + 's ease-in-out';
    selector.style.strokeDashoffset = '0';

    window.setTimeout(function() {
      if (iteration < 6) {
        selector.parentNode.removeChild(selector);
      }
      else {
        // elements.push(selector);
      }
    }, ((speed*1000) + 100));
  }, delay);
}


$(document).ready(function() {
  currentSVG = '#art0';
  animate();

  $('#loop').click(function(event) {
    if (!loop) {
      loop = true;
      $('#loop').css('background-color', 'red').html('Stop');
      if (!running) {
        whiteDelay = 3000;
        animate();
      }
    }
    else {
      loop = false;

      $('#loop').css('background-color', 'green').html('Loop');
    }
  });


});

// Will animate the inner part of the svg
var animate = function() {

  // for (var i in elements) {
  //  elements[i].parentNode.removeChild(elements[i]);
  // }
  // elements = [];

  var currentTime = 0;
  running = true;

  // Inner frame triangles
  // Top left
  parentSelector = '#innerFrameTopLeftTriangle';
  drawLine('.border', currentTime, 1000);
  drawLine('.zigzag', currentTime+750, 1000);
  drawLines('.zigzagLines', currentTime+1750, 125, 500);
  parentSelector = '#innerFrameTopLeftTriangleBottomLeftBox';
  drawLine('.border', currentTime+1000, 500);
  drawLines('.slant', currentTime+1500, 125, 500);
  parentSelector = '#innerFrameTopLeftTriangleLargeBox';
  drawLine('.border', currentTime+1250, 500);
  drawLines('.slant', currentTime+1750, 125, 500);
  parentSelector = '#innerFrameTopLeftTriangleTopRightBox';
  drawLine('.border', currentTime+1500, 500);
  drawLines('.slant', currentTime+2000, 125, 500);
  // Bottom right
  parentSelector = '#innerFrameBottomRightTriangle';
  drawLine('.border', currentTime, 1000);
  drawLine('.zigzag', currentTime+750, 1000);
  drawLines('.zigzagLines', currentTime+1750, 125, 500);
  parentSelector = '#innerFrameBottomRightTriangleTopRightBox';
  drawLine('.border', currentTime+1000, 500);
  drawLines('.slant', currentTime+1500, 125, 500);
  parentSelector = '#innerFrameBottomRightTriangleLargeBox';
  drawLine('.border', currentTime+1250, 500);
  drawLines('.slant', currentTime+1750, 125, 500);
  parentSelector = '#innerFrameBottomRightTriangleBottomLeftBox';
  drawLine('.border', currentTime+1500, 500);
  drawLines('.slant', currentTime+2000, 125, 500);

  currentTime += 1000;

  // Inner frame
  parentSelector = '#innerFrame';
  // bars
  drawLines('.frameRightBar', currentTime, 250, 500);
  drawLines('.frameTopBar', currentTime+125, 250, 500);
  drawLines('.frameLeftBar', currentTime, 250, 500);
  drawLines('.frameBottomBar', currentTime+125, 250, 500);
  // notches
  drawLines('#frameRightNotches0 line', currentTime+125, 15, 100);
  drawLines('#frameRightNotches1 line', currentTime+375, 30, 100);
  drawLines('#frameRightNotches2 line', currentTime+625, 60, 100);
  drawLines('#frameRightNotches3 line', currentTime+875, 120, 100);
  drawLines('#frameTopNotches0 line', currentTime+250, 15, 100);
  drawLines('#frameTopNotches1 line', currentTime+500, 30, 100);
  drawLines('#frameTopNotches2 line', currentTime+750, 60, 100);
  drawLines('#frameTopNotches3 line', currentTime+1000, 120, 100);
  drawLines('#frameLeftNotches0 line', currentTime+125, 15, 100);
  drawLines('#frameLeftNotches1 line', currentTime+375, 30, 100);
  drawLines('#frameLeftNotches2 line', currentTime+625, 60, 100);
  drawLines('#frameLeftNotches3 line', currentTime+875, 120, 100);
  drawLines('#frameBottomNotches0 line', currentTime+250, 15, 100);
  drawLines('#frameBottomNotches1 line', currentTime+500, 30, 100);
  drawLines('#frameBottomNotches2 line', currentTime+750, 60, 100);
  drawLines('#frameBottomNotches3 line', currentTime+1000, 120, 100);
  
  currentTime += 1000;

  // Inner frame shadows
  parentSelector = '#innerFrameShadowTopRight';
  drawLines('.short', currentTime+250, 25, 100);
  drawLines('.long', currentTime+350, 20, 100);
  parentSelector = '#innerFrameShadowBottomLeft';
  drawLines('.short', currentTime+250, 25, 100);
  drawLines('.long', currentTime+350, 20, 100);

  currentTime += 1000;

  // Inner frame container
  parentSelector = '#innerFrameContainer';
  drawLine('.left', currentTime, 1000);
  drawLine('.right', currentTime, 1000);
  parentSelector = '#innerFrameContainerLeftTriangle';
  drawLine('.border', currentTime+750, 500);
  drawLines('line', currentTime+1000, 0, 250);
  parentSelector = '#innerFrameContainerRightTriangle';
  drawLine('.border', currentTime+750, 500);
  drawLines('line', currentTime+1000, 0, 250);

  // Bottom outside triangles
  parentSelector = '#bltriangle';
  drawLine('.border', currentTime+250, 500);
  drawLines('.slant', currentTime+750, 50, 100);
  parentSelector = '#brtriangle';
  drawLine('.border', currentTime+250, 500);
  drawLines('.slant', currentTime+750, 50, 100);


  currentTime += 1000;

  // Top middle diamonds
  parentSelector = '#tmldiamond';
  drawLine('.circle', currentTime, 500);
  drawLines('line', currentTime+500, 50, 100);
  drawLines('.point path', currentTime+500, 0, 500);
  parentSelector = '#tmrdiamond';
  drawLine('.circle', currentTime, 500);
  drawLines('line', currentTime+500, 50, 100);
  drawLines('.point path', currentTime+500, 0, 500);

  currentTime += 250;

  // Top outside diamonds
  parentSelector = '#tldiamond';
  drawLine('.circle', currentTime, 500);
  drawLines('line', currentTime+500, 50, 100);
  drawLines('.point path', currentTime+500, 0, 500);
  parentSelector = '#trdiamond';
  drawLine('.circle', currentTime, 500);
  drawLines('line', currentTime+500, 50, 100);
  drawLines('.point path', currentTime+500, 0, 500);

  // Bottom middle diamonds
  parentSelector = '#bmldiamond';
  drawLine('.circle', currentTime, 500);
  drawLines('line', currentTime+500, 50, 100);
  drawLines('.point path', currentTime+500, 0, 500);
  parentSelector = '#bmrdiamond';
  drawLine('.circle', currentTime, 500);
  drawLines('line', currentTime+500, 50, 100);
  drawLines('.point path', currentTime+500, 0, 500);

  currentTime += 250;

  // Bottom outside diamonds
  parentSelector = '#bldiamond';
  drawLine('.circle', currentTime, 500);
  drawLines('line', currentTime+500, 50, 100);
  drawLines('.point path', currentTime+500, 0, 500);
  parentSelector = '#brdiamond';
  drawLine('.circle', currentTime, 500);
  drawLines('line', currentTime+500, 50, 100);
  drawLines('.point path', currentTime+500, 0, 500);

  currentTime += 500;

  // Snakes
  parentSelector = '#lsnake';
  drawLine('.border', currentTime, 3000);
  drawLine('.ol', currentTime+500, 1500);
  drawLine('.ml', currentTime+500, 1500);
  drawLine('.il', currentTime+500, 1500);
  drawLines('.box rect', currentTime+250, 0, 250);
  drawLines('.box line', currentTime+500, 0, 100);
  parentSelector = '#lsnake .outerslants';
  drawLines('line', currentTime+750, 10, 100);
  parentSelector = '#lsnake .innerslants';
  drawLines('line', currentTime+750, 10, 100);
  parentSelector = '#rsnake';
  drawLine('.border', currentTime, 3000);
  drawLine('.ol', currentTime+500, 1500);
  drawLine('.ml', currentTime+500, 1500);
  drawLine('.il', currentTime+500, 1500);
  drawLines('.box rect', currentTime+250, 0, 250);
  drawLines('.box line', currentTime+500, 0, 100);
  parentSelector = '#rsnake .outerslants';
  drawLines('line', currentTime+750, 10, 100);
  parentSelector = '#rsnake .innerslants';
  drawLines('line', currentTime+750, 10, 100);

  currentTime += 500;

  // Left square
  parentSelector = '#lsquare';
  drawLines('.border', currentTime+500, 500, 2000);
  drawLines('.circle', currentTime+2000, 250, 1000);

  // Right square
  parentSelector = '#rsquare';
  drawLines('.border', currentTime+500, 500, 2000);
  drawLines('.circle', currentTime+2000, 250, 1000);

  // Top boxes
  parentSelector = '#tlbox';
  drawLine('.border', currentTime, 1000);
  drawLines('.triangle', currentTime, 250, 500);
  drawLines('.circle', currentTime+1000, 250, 500);
  drawLines('line', currentTime+2000, 100, 500);
  parentSelector = '#trbox';
  drawLine('.border', currentTime, 1000);
  drawLines('.triangle', currentTime, 250, 500);
  drawLines('.circle', currentTime+1000, 250, 500);
  drawLines('line', currentTime+2000, 100, 500);

  currentTime += 900;

  // Bottom boxes
  parentSelector = '#blbox';
  drawLine('.border', currentTime, 1000);
  drawLines('.triangle', currentTime, 250, 500);
  drawLines('.circle', currentTime+1000, 250, 500);
  drawLines('line', currentTime+2000, 100, 500);
  parentSelector = '#brbox';
  drawLine('.border', currentTime, 1000);
  drawLines('.triangle', currentTime, 250, 500);
  drawLines('.circle', currentTime+1000, 250, 500);
  drawLines('line', currentTime+2000, 100, 500);

  currentTime += 100;

  // Bottom triangle
  parentSelector = '#bmtriangle';
  drawLine('.border', currentTime, 500);
  drawLines('.lslants', currentTime+500, 150, 500);
  drawLines('.rslants', currentTime+500, 150, 500);
  drawLines('.hslants', currentTime+500, 150, 500);

  currentTime += 1000;

  // Bottom decoration
  parentSelector = '#bdecoration';
  drawLines('.hslant', currentTime, 0, 500);
  parentSelector += ' .triangle';
  drawLines('.left', currentTime+250, 0, 1000);
  drawLines('.right', currentTime+250, 0, 1000);
  drawLines('.luslants', currentTime+1000, 100, 250);
  drawLines('.ruslants', currentTime+1000, 100, 250);
  drawLines('.ldslants', currentTime+1500, 100, 250);
  drawLines('.rdslants', currentTime+1500, 100, 250);
  drawLines('#lunotches0 line', currentTime+1250, 100, 250);
  drawLines('#runotches0 line', currentTime+1250, 100, 250);
  drawLines('#lunotches1 line', currentTime+1500, 100, 250);
  drawLines('#runotches1 line', currentTime+1500, 100, 250);
  drawLines('#ldnotches0 line', currentTime+1750, 100, 250);
  drawLines('#rdnotches0 line', currentTime+1750, 100, 250);
  drawLines('#ldnotches1 line', currentTime+2000, 100, 250);
  drawLines('#rdnotches1 line', currentTime+2000, 100, 250);

  // Top decoration
  parentSelector = '#tdecoration';
  drawLines('.btip0', currentTime, 0, 1000);
  drawLines('#ttriangle .border', currentTime+500, 0, 500);
  drawLines('#ttriangle .lslant', currentTime+750, 100, 250);
  drawLines('#ttriangle .rslant', currentTime+750, 100, 250);
  drawLines('#ttriangler .border', currentTime+750, 0, 500);
  drawLines('#ttriangler .lslant', currentTime+1000, 0, 250);
  drawLines('#ttriangler .rslant', currentTime+1000, 0, 250);
  drawLines('.btip1', currentTime+250, 0, 1000);
  drawLines('#mbox .border', currentTime+1250, 0, 250);
  drawLines('#mbox .slant', currentTime+1375, 0, 250);
  drawLine('#rtriangle .border', currentTime+1375, 500);
  drawLines('#rtriangle .slant', currentTime+1500, 250, 500);
  drawLine('#ltriangle .border', currentTime+1375, 500);
  drawLines('#ltriangle .slant', currentTime+1500, 250, 500);
  drawLines('.ouslant', currentTime+750, 0, 500);
  drawLines('.iuslant', currentTime+1000, 0, 500);
  drawLines('#bsquares .square0', currentTime+1500, 0, 500);
  drawLines('#bsquares .square1', currentTime+1150, 0, 500);
  drawLines('#bsquares .square2', currentTime+1800, 0, 500);
  drawLine('.lzigzags', currentTime+2000, 1000);
  drawLine('.rzigzags', currentTime+2000, 1000);
  drawLines('.tbase', currentTime+1250, 0, 750);
  drawLines('.ttip0', currentTime+1750, 0, 750);
  drawLines('.oouslant', currentTime+2000, 0, 750);

  // Bottom lines
  parentSelector = '#blines';
  drawLines('.line0', currentTime, 0, 1000);
  drawLines('.line1', currentTime+500, 0, 1000);
  drawLines('.line2', currentTime+1000, 0, 1000);
  // Top lines
  parentSelector = '#tlines';
  drawLines('.line0', currentTime, 0, 1000);
  drawLines('.line1', currentTime+500, 0, 1000);
  drawLines('.line2', currentTime+1000, 0, 1000);

  currentTime += 3500+whiteDelay;

  window.setTimeout(function() {
    console.log('fin');
    running = false;
    if (loop) {
      whiteDelay = 3000;
      animate();
    }
  }, currentTime);
};