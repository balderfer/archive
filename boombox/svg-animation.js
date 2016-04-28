// var currentTime = 0;
var parentSelector = "";
var currentSVG = "";
var colors = ['#FFFFFF', '#F1C40F', '#E67E22', '#E74C3C', '#9B59B6', '#3498DB', '#34495E'];
var whiteDelay = 0;
var loop = false;
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


// $(document).ready(function() {
// 	currentSVG = '#art0';
// 	// animate();

// 	$('#loop').click(function(event) {
// 		if (!loop) {
// 			loop = true;
// 			$('#loop').css('background-color', 'red').html('Stop');
// 			if (!running) {
// 				whiteDelay = 3000;
// 				// animate();
// 			}
// 		}
// 		else {
// 			loop = false;

// 			$('#loop').css('background-color', 'green').html('Loop');
// 		}
// 	});


// });

// Will animate the inner part of the svg
var animate = function(cb) {

	// for (var i in elements) {
	// 	elements[i].parentNode.removeChild(elements[i]);
	// }
	// elements = [];

	var currentTime = 0;
	running = true;

	// Inner frame triangles
	// Top left
	parentSelector = '#innerFrameTopLeftTriangle';
	introDrawLine('.border', currentTime, 1000);
	introDrawLine('.zigzag', currentTime+750, 1000);
	introDrawLines('.zigzagLines', currentTime+1750, 125, 500);
	parentSelector = '#innerFrameTopLeftTriangleBottomLeftBox';
	introDrawLine('.border', currentTime+1000, 500);
	introDrawLines('.slant', currentTime+1500, 125, 500);
	parentSelector = '#innerFrameTopLeftTriangleLargeBox';
	introDrawLine('.border', currentTime+1250, 500);
	introDrawLines('.slant', currentTime+1750, 125, 500);
	parentSelector = '#innerFrameTopLeftTriangleTopRightBox';
	introDrawLine('.border', currentTime+1500, 500);
	introDrawLines('.slant', currentTime+2000, 125, 500);
	// Bottom right
	parentSelector = '#innerFrameBottomRightTriangle';
	introDrawLine('.border', currentTime, 1000);
	introDrawLine('.zigzag', currentTime+750, 1000);
	introDrawLines('.zigzagLines', currentTime+1750, 125, 500);
	parentSelector = '#innerFrameBottomRightTriangleTopRightBox';
	introDrawLine('.border', currentTime+1000, 500);
	introDrawLines('.slant', currentTime+1500, 125, 500);
	parentSelector = '#innerFrameBottomRightTriangleLargeBox';
	introDrawLine('.border', currentTime+1250, 500);
	introDrawLines('.slant', currentTime+1750, 125, 500);
	parentSelector = '#innerFrameBottomRightTriangleBottomLeftBox';
	introDrawLine('.border', currentTime+1500, 500);
	introDrawLines('.slant', currentTime+2000, 125, 500);

	currentTime += 1000;

	// Inner frame
	parentSelector = '#innerFrame';
	// bars
	introDrawLines('.frameRightBar', currentTime, 250, 500);
	introDrawLines('.frameTopBar', currentTime+125, 250, 500);
	introDrawLines('.frameLeftBar', currentTime, 250, 500);
	introDrawLines('.frameBottomBar', currentTime+125, 250, 500);
	// notches
	introDrawLines('#frameRightNotches0 line', currentTime+125, 15, 100);
	introDrawLines('#frameRightNotches1 line', currentTime+375, 30, 100);
	introDrawLines('#frameRightNotches2 line', currentTime+625, 60, 100);
	introDrawLines('#frameRightNotches3 line', currentTime+875, 120, 100);
	introDrawLines('#frameTopNotches0 line', currentTime+250, 15, 100);
	introDrawLines('#frameTopNotches1 line', currentTime+500, 30, 100);
	introDrawLines('#frameTopNotches2 line', currentTime+750, 60, 100);
	introDrawLines('#frameTopNotches3 line', currentTime+1000, 120, 100);
	introDrawLines('#frameLeftNotches0 line', currentTime+125, 15, 100);
	introDrawLines('#frameLeftNotches1 line', currentTime+375, 30, 100);
	introDrawLines('#frameLeftNotches2 line', currentTime+625, 60, 100);
	introDrawLines('#frameLeftNotches3 line', currentTime+875, 120, 100);
	introDrawLines('#frameBottomNotches0 line', currentTime+250, 15, 100);
	introDrawLines('#frameBottomNotches1 line', currentTime+500, 30, 100);
	introDrawLines('#frameBottomNotches2 line', currentTime+750, 60, 100);
	introDrawLines('#frameBottomNotches3 line', currentTime+1000, 120, 100);
	
	currentTime += 1000;

	// Inner frame shadows
	parentSelector = '#innerFrameShadowTopRight';
	introDrawLines('.short', currentTime+250, 25, 100);
	introDrawLines('.long', currentTime+350, 20, 100);
	parentSelector = '#innerFrameShadowBottomLeft';
	introDrawLines('.short', currentTime+250, 25, 100);
	introDrawLines('.long', currentTime+350, 20, 100);

	currentTime += 1000;

	// Inner frame container
	parentSelector = '#innerFrameContainer';
	introDrawLine('.left', currentTime, 1000);
	introDrawLine('.right', currentTime, 1000);
	parentSelector = '#innerFrameContainerLeftTriangle';
	introDrawLine('.border', currentTime+750, 500);
	introDrawLines('line', currentTime+1000, 0, 250);
	parentSelector = '#innerFrameContainerRightTriangle';
	introDrawLine('.border', currentTime+750, 500);
	introDrawLines('line', currentTime+1000, 0, 250);

	// Bottom outside triangles
	parentSelector = '#bltriangle';
	introDrawLine('.border', currentTime+250, 500);
	introDrawLines('.slant', currentTime+750, 50, 100);
	parentSelector = '#brtriangle';
	introDrawLine('.border', currentTime+250, 500);
	introDrawLines('.slant', currentTime+750, 50, 100);


	currentTime += 1000;

	// Top middle diamonds
	parentSelector = '#tmldiamond';
	introDrawLine('.circle', currentTime, 500);
	introDrawLines('line', currentTime+500, 50, 100);
	introDrawLines('.point path', currentTime+500, 0, 500);
	parentSelector = '#tmrdiamond';
	introDrawLine('.circle', currentTime, 500);
	introDrawLines('line', currentTime+500, 50, 100);
	introDrawLines('.point path', currentTime+500, 0, 500);

	currentTime += 250;

	// Top outside diamonds
	parentSelector = '#tldiamond';
	introDrawLine('.circle', currentTime, 500);
	introDrawLines('line', currentTime+500, 50, 100);
	introDrawLines('.point path', currentTime+500, 0, 500);
	parentSelector = '#trdiamond';
	introDrawLine('.circle', currentTime, 500);
	introDrawLines('line', currentTime+500, 50, 100);
	introDrawLines('.point path', currentTime+500, 0, 500);

	// Bottom middle diamonds
	parentSelector = '#bmldiamond';
	introDrawLine('.circle', currentTime, 500);
	introDrawLines('line', currentTime+500, 50, 100);
	introDrawLines('.point path', currentTime+500, 0, 500);
	parentSelector = '#bmrdiamond';
	introDrawLine('.circle', currentTime, 500);
	introDrawLines('line', currentTime+500, 50, 100);
	introDrawLines('.point path', currentTime+500, 0, 500);

	currentTime += 250;

	// Bottom outside diamonds
	parentSelector = '#bldiamond';
	introDrawLine('.circle', currentTime, 500);
	introDrawLines('line', currentTime+500, 50, 100);
	introDrawLines('.point path', currentTime+500, 0, 500);
	parentSelector = '#brdiamond';
	introDrawLine('.circle', currentTime, 500);
	introDrawLines('line', currentTime+500, 50, 100);
	introDrawLines('.point path', currentTime+500, 0, 500);

	currentTime += 500;

	// Snakes
	parentSelector = '#lsnake';
	introDrawLine('.border', currentTime, 3000);
	introDrawLine('.ol', currentTime+500, 1500);
	introDrawLine('.ml', currentTime+500, 1500);
	introDrawLine('.il', currentTime+500, 1500);
	introDrawLines('.box rect', currentTime+250, 0, 250);
	introDrawLines('.box line', currentTime+500, 0, 100);
	parentSelector = '#lsnake .outerslants';
	introDrawLines('line', currentTime+750, 10, 100);
	parentSelector = '#lsnake .innerslants';
	introDrawLines('line', currentTime+750, 10, 100);
	parentSelector = '#rsnake';
	introDrawLine('.border', currentTime, 3000);
	introDrawLine('.ol', currentTime+500, 1500);
	introDrawLine('.ml', currentTime+500, 1500);
	introDrawLine('.il', currentTime+500, 1500);
	introDrawLines('.box rect', currentTime+250, 0, 250);
	introDrawLines('.box line', currentTime+500, 0, 100);
	parentSelector = '#rsnake .outerslants';
	introDrawLines('line', currentTime+750, 10, 100);
	parentSelector = '#rsnake .innerslants';
	introDrawLines('line', currentTime+750, 10, 100);

	currentTime += 500;

	// Left square
	parentSelector = '#lsquare';
	introDrawLines('.border', currentTime+500, 500, 2000);
	introDrawLines('.circle', currentTime+2000, 250, 1000);

	// Right square
	parentSelector = '#rsquare';
	introDrawLines('.border', currentTime+500, 500, 2000);
	introDrawLines('.circle', currentTime+2000, 250, 1000);

	// Top boxes
	parentSelector = '#tlbox';
	introDrawLine('.border', currentTime, 1000);
	introDrawLines('.triangle', currentTime, 250, 500);
	introDrawLines('.circle', currentTime+1000, 250, 500);
	introDrawLines('line', currentTime+2000, 100, 500);
	parentSelector = '#trbox';
	introDrawLine('.border', currentTime, 1000);
	introDrawLines('.triangle', currentTime, 250, 500);
	introDrawLines('.circle', currentTime+1000, 250, 500);
	introDrawLines('line', currentTime+2000, 100, 500);

	currentTime += 900;

	// Bottom boxes
	parentSelector = '#blbox';
	introDrawLine('.border', currentTime, 1000);
	introDrawLines('.triangle', currentTime, 250, 500);
	introDrawLines('.circle', currentTime+1000, 250, 500);
	introDrawLines('line', currentTime+2000, 100, 500);
	parentSelector = '#brbox';
	introDrawLine('.border', currentTime, 1000);
	introDrawLines('.triangle', currentTime, 250, 500);
	introDrawLines('.circle', currentTime+1000, 250, 500);
	introDrawLines('line', currentTime+2000, 100, 500);

	currentTime += 100;

	// Bottom triangle
	parentSelector = '#bmtriangle';
	introDrawLine('.border', currentTime, 500);
	introDrawLines('.lslants', currentTime+500, 150, 500);
	introDrawLines('.rslants', currentTime+500, 150, 500);
	introDrawLines('.hslants', currentTime+500, 150, 500);

	currentTime += 1000;

	// Bottom decoration
	parentSelector = '#bdecoration';
	introDrawLines('.hslant', currentTime, 0, 500);
	parentSelector += ' .triangle';
	introDrawLines('.left', currentTime+250, 0, 1000);
	introDrawLines('.right', currentTime+250, 0, 1000);
	introDrawLines('.luslants', currentTime+1000, 100, 250);
	introDrawLines('.ruslants', currentTime+1000, 100, 250);
	introDrawLines('.ldslants', currentTime+1500, 100, 250);
	introDrawLines('.rdslants', currentTime+1500, 100, 250);
	introDrawLines('#lunotches0 line', currentTime+1250, 100, 250);
	introDrawLines('#runotches0 line', currentTime+1250, 100, 250);
	introDrawLines('#lunotches1 line', currentTime+1500, 100, 250);
	introDrawLines('#runotches1 line', currentTime+1500, 100, 250);
	introDrawLines('#ldnotches0 line', currentTime+1750, 100, 250);
	introDrawLines('#rdnotches0 line', currentTime+1750, 100, 250);
	introDrawLines('#ldnotches1 line', currentTime+2000, 100, 250);
	introDrawLines('#rdnotches1 line', currentTime+2000, 100, 250);

	// Top decoration
	parentSelector = '#tdecoration';
	introDrawLines('.btip0', currentTime, 0, 1000);
	introDrawLines('#ttriangle .border', currentTime+500, 0, 500);
	introDrawLines('#ttriangle .lslant', currentTime+750, 100, 250);
	introDrawLines('#ttriangle .rslant', currentTime+750, 100, 250);
	introDrawLines('#ttriangler .border', currentTime+750, 0, 500);
	introDrawLines('#ttriangler .lslant', currentTime+1000, 0, 250);
	introDrawLines('#ttriangler .rslant', currentTime+1000, 0, 250);
	introDrawLines('.btip1', currentTime+250, 0, 1000);
	introDrawLines('#mbox .border', currentTime+1250, 0, 250);
	introDrawLines('#mbox .slant', currentTime+1375, 0, 250);
	introDrawLine('#rtriangle .border', currentTime+1375, 500);
	introDrawLines('#rtriangle .slant', currentTime+1500, 250, 500);
	introDrawLine('#ltriangle .border', currentTime+1375, 500);
	introDrawLines('#ltriangle .slant', currentTime+1500, 250, 500);
	introDrawLines('.ouslant', currentTime+750, 0, 500);
	introDrawLines('.iuslant', currentTime+1000, 0, 500);
	introDrawLines('#bsquares .square0', currentTime+1500, 0, 500);
	introDrawLines('#bsquares .square1', currentTime+1150, 0, 500);
	introDrawLines('#bsquares .square2', currentTime+1800, 0, 500);
	introDrawLine('.lzigzags', currentTime+2000, 1000);
	introDrawLine('.rzigzags', currentTime+2000, 1000);
	introDrawLines('.tbase', currentTime+1250, 0, 750);
	introDrawLines('.ttip0', currentTime+1750, 0, 750);
	introDrawLines('.oouslant', currentTime+2000, 0, 750);

	// Bottom lines
	parentSelector = '#blines';
	introDrawLines('.line0', currentTime, 0, 1000);
	introDrawLines('.line1', currentTime+500, 0, 1000);
	introDrawLines('.line2', currentTime+1000, 0, 1000);
	// Top lines
	parentSelector = '#tlines';
	introDrawLines('.line0', currentTime, 0, 1000);
	introDrawLines('.line1', currentTime+500, 0, 1000);
	introDrawLines('.line2', currentTime+1000, 0, 1000);

	window.setTimeout(function() {
		$('#subwoofer').fadeIn('slow');
	}, 2000);


	window.setTimeout(function() {
		var lsp = document.getElementById('lspeaker');
		lsp.setAttribute('class', 'fadeIn');
		var rsp = document.getElementById('rspeaker');
		rsp.setAttribute('class', 'fadeIn');
	}, 6500);


	if (cb) {
		window.setTimeout(function() {
			cb();
		}, 8500);
	}
	// currentTime += 3500+whiteDelay;
};



var introDrawLine = function(s, delay, speed) {
	var selector = getSelector(s)[0];
	introDraw(selector, delay, speed);
}


var introDrawLines = function(s, delay, pause, speed) {
	el = getSelector(s);
	var iterator = 0;
	[].forEach.call(el, function(selector) {
		introDraw(selector, delay + (pause*iterator), speed);
		iterator++;
	})
}

var introDraw = function(selector, delay, speed) {
	var iteration = parseInt(selector.getAttribute('data-iteration'));
	if (!iteration) iteration = 0;

	selector.setAttribute('stroke', 'white');


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

	selector.style.strokeDasharray = length;
	selector.style.strokeDashoffset = length;
	// selector.style.display = "none";

	window.setTimeout(function() {
		selector.style.display = "block";
		selector.style.transition = selector.style.WebkitTransition = 'none';
		selector.style.strokeDasharray = length;
		selector.style.strokeDashoffset = length;
		selector.setAttribute('stroke', '#333');
		selector.style.transition = selector.style.WebkitTransition = 'stroke-dashoffset ' + speed + 's ease-in-out';
		selector.style.strokeDasharray = length;
		selector.style.strokeDashoffset = '0';
		selector.getBoundingClientRect();

	}, delay);
}



var mDrawLine = function(s, delay, speed) {
	var selector = getSelector(s)[0];
	mDraw(selector, delay, speed);
}


var mDrawLines = function(s, delay, pause, speed) {
	el = getSelector(s);
	var iterator = 0;
	[].forEach.call(el, function(selector) {
		mDraw(selector, delay + (pause*iterator), speed);
		iterator++;
	})
}

var mDraw = function(selector, delay, speed) {
	var iteration = parseInt(selector.getAttribute('data-iteration'));
	if (!iteration) iteration = 0;

	selector.setAttribute('stroke', '34495E');
	// selector.style.display = "none";


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

	// selector.style.strokeDasharray = length;
	// selector.style.strokeDashoffset = length;


	window.setTimeout(function() {
		selector.style.display = "block";
		selector.style.transition = selector.style.WebkitTransition = 'none';
		selector.style.strokeDasharray = length;
		selector.style.strokeDashoffset = '0';
		selector.style.transition = selector.style.WebkitTransition = 'stroke-dashoffset ' + (speed / 4) + 's ease-in-out';
		selector.style.strokeDasharray = length;
		selector.style.strokeDashoffset = length;
		selector.getBoundingClientRect();

		window.setTimeout(function() {
			selector.style.display = "block";
			selector.getBoundingClientRect();
			selector.style.transition = selector.style.WebkitTransition = 'stroke-dashoffset ' + speed + 's ease-in-out';
			selector.style.strokeDashoffset = '0';
		}, delay);

	}, delay);
}

var snakeLock = false;
var drawSnakes = function() {
	if (!snakeLock) {
		snakeLock = true;
		var currentTime = 0;
		parentSelector = '#lsnake';
		mDrawLine('.border', currentTime, 3000);
		mDrawLine('.ol', currentTime, 1500);
		mDrawLine('.ml', currentTime, 1500);
		mDrawLine('.il', currentTime, 1500);
		mDrawLines('.box rect', currentTime, 0, 250);
		mDrawLines('.box line', currentTime, 0, 100);
		parentSelector = '#lsnake .outerslants';
		mDrawLines('line', currentTime, 10, 100);
		parentSelector = '#lsnake .innerslants';
		mDrawLines('line', currentTime, 10, 100);
		parentSelector = '#rsnake';
		mDrawLine('.border', currentTime, 3000);
		mDrawLine('.ol', currentTime, 1500);
		mDrawLine('.ml', currentTime, 1500);
		mDrawLine('.il', currentTime, 1500);
		mDrawLines('.box rect', currentTime, 0, 250);
		mDrawLines('.box line', currentTime, 0, 100);
		parentSelector = '#rsnake .outerslants';
		mDrawLines('line', currentTime, 10, 100);
		parentSelector = '#rsnake .innerslants';
		mDrawLines('line', currentTime, 10, 100);

		window.setTimeout(function() {
			snakeLock = false;
		}, 1000);
	}
}



var drawDecorations = function() {
	currentTime = 0;

	// Top middle diamonds
	parentSelector = '#tmldiamond';
	mDrawLine('.circle', currentTime, 500);
	mDrawLines('line', currentTime, 0, 100);
	mDrawLines('.point path', currentTime, 0, 500);
	parentSelector = '#tmrdiamond';
	mDrawLine('.circle', currentTime, 500);
	mDrawLines('line', currentTime, 0, 100);
	mDrawLines('.point path', currentTime, 0, 500);

	currentTime += 0;

	// Top outside diamonds
	parentSelector = '#tldiamond';
	mDrawLine('.circle', currentTime, 500);
	mDrawLines('line', currentTime, 0, 100);
	mDrawLines('.point path', currentTime, 0, 500);
	parentSelector = '#trdiamond';
	mDrawLine('.circle', currentTime, 500);
	mDrawLines('line', currentTime, 0, 100);
	mDrawLines('.point path', currentTime, 0, 500);

	// Bottom middle diamonds
	parentSelector = '#bmldiamond';
	mDrawLine('.circle', currentTime, 500);
	mDrawLines('line', currentTime, 0, 100);
	mDrawLines('.point path', currentTime, 0, 500);
	parentSelector = '#bmrdiamond';
	mDrawLine('.circle', currentTime, 500);
	mDrawLines('line', currentTime, 0, 100);
	mDrawLines('.point path', currentTime, 0, 500);

	currentTime += 0;

	// Bottom outside diamonds
	parentSelector = '#bldiamond';
	mDrawLine('.circle', currentTime, 500);
	mDrawLines('line', currentTime, 0, 100);
	mDrawLines('.point path', currentTime, 0, 500);
	parentSelector = '#brdiamond';
	mDrawLine('.circle', currentTime, 500);
	mDrawLines('line', currentTime, 0, 100);
	mDrawLines('.point path', currentTime, 0, 500);

	currentTime += 0;

	// Bottom triangle
	parentSelector = '#bmtriangle';
	mDrawLine('.border', currentTime, 500);
	mDrawLines('.lslants', currentTime, 0, 500);
	mDrawLines('.rslants', currentTime, 0, 500);
	mDrawLines('.hslants', currentTime, 0, 500);

	currentTime = 0;

	// Bottom decoration
	parentSelector = '#bdecoration';
	mDrawLines('.hslant', currentTime, 0, 500);
	parentSelector += ' .triangle';
	mDrawLines('.left', currentTime, 0, 1000);
	mDrawLines('.right', currentTime, 0, 1000);
	mDrawLines('.luslants', currentTime, 0, 250);
	mDrawLines('.ruslants', currentTime, 0, 250);
	mDrawLines('.ldslants', currentTime, 0, 250);
	mDrawLines('.rdslants', currentTime, 0, 250);
	mDrawLines('#lunotches0 line', currentTime, 0, 250);
	mDrawLines('#runotches0 line', currentTime, 0, 250);
	mDrawLines('#lunotches1 line', currentTime, 0, 250);
	mDrawLines('#runotches1 line', currentTime, 0, 250);
	mDrawLines('#ldnotches0 line', currentTime, 0, 250);
	mDrawLines('#rdnotches0 line', currentTime, 0, 250);
	mDrawLines('#ldnotches1 line', currentTime, 0, 250);
	mDrawLines('#rdnotches1 line', currentTime, 0, 250);

	// Top decoration
	parentSelector = '#tdecoration';
	mDrawLines('.btip0', currentTime, 0, 1000);
	mDrawLines('#ttriangle .border', currentTime+500, 0, 500);
	mDrawLines('#ttriangle .lslant', currentTime+750, 100, 250);
	mDrawLines('#ttriangle .rslant', currentTime+750, 100, 250);
	mDrawLines('#ttriangler .border', currentTime+750, 0, 500);
	mDrawLines('#ttriangler .lslant', currentTime+1000, 0, 250);
	mDrawLines('#ttriangler .rslant', currentTime+1000, 0, 250);
	mDrawLines('.btip1', currentTime+250, 0, 1000);
	mDrawLines('#mbox .border', currentTime+1250, 0, 250);
	mDrawLines('#mbox .slant', currentTime+1375, 0, 250);
	mDrawLine('#rtriangle .border', currentTime+1375, 500);
	mDrawLines('#rtriangle .slant', currentTime+1500, 250, 500);
	mDrawLine('#ltriangle .border', currentTime+1375, 500);
	mDrawLines('#ltriangle .slant', currentTime+1500, 250, 500);
	mDrawLines('.ouslant', currentTime+750, 0, 500);
	mDrawLines('.iuslant', currentTime+1000, 0, 500);
	mDrawLines('#bsquares .square0', currentTime+1500, 0, 500);
	mDrawLines('#bsquares .square1', currentTime+1150, 0, 500);
	mDrawLines('#bsquares .square2', currentTime+1800, 0, 500);
	mDrawLine('.lzigzags', currentTime+2000, 1000);
	mDrawLine('.rzigzags', currentTime+2000, 1000);
	mDrawLines('.tbase', currentTime+1250, 0, 750);
	mDrawLines('.ttip0', currentTime+1750, 0, 750);
	mDrawLines('.oouslant', currentTime+2000, 0, 750);

	// Bottom lines
	parentSelector = '#blines';
	mDrawLines('.line0', currentTime, 0, 1000);
	mDrawLines('.line1', currentTime+500, 0, 1000);
	mDrawLines('.line2', currentTime+1000, 0, 1000);
	// Top lines
	parentSelector = '#tlines';
	mDrawLines('.line0', currentTime, 0, 1000);
	mDrawLines('.line1', currentTime+500, 0, 1000);
	mDrawLines('.line2', currentTime+1000, 0, 1000);
}


var tlBox = document.querySelectorAll('#tlbox')[0];
var trBox = document.querySelectorAll('#trbox')[0];
var blBox = document.querySelectorAll('#blbox')[0];
var brBox = document.querySelectorAll('#brbox')[0];
var twingOuterSpeakers = function(diff) {
  tlbox.setAttribute("transform", "translate(" + diff + ", " + diff*3 + ")");
  trbox.setAttribute("transform", "translate(" + -diff + ", " + diff*3 + ")");
  blbox.setAttribute("transform", "translate(" + diff + ", " + -diff*3 + ")");
  brbox.setAttribute("transform", "translate(" + -diff + ", " + -diff*3 + ")");
}

var lsquare = document.querySelectorAll('#lsquare')[0];
var rsquare = document.querySelectorAll('#rsquare')[0];
var twingBigSpeakers = function(diff) {
  lsquare.setAttribute("transform", "translate(" + diff + ", " + 0 + ")");
  rsquare.setAttribute("transform", "translate(" + -diff + ", " + 0 + ")");
}


var innerCircles = document.querySelectorAll(".centerCircle");
var rippleLock = false;
var rippleInnerCircles = function() {
	if (!rippleLock) {
		// rippleLock = true;
		rippleHelper(0, 0);
	}
}

var rippleHelper = function(i, delay) {
	window.setTimeout(function() {
		var circle = innerCircles[i];
		circle.className = 'centerCircle ripple';
		
		window.setTimeout(function() {
			circle.className = 'centerCircle';
		}, 100);

		if (i+1 < innerCircles.length) {
			rippleHelper(i+1, delay+2);
		} else {
			window.setTimeout(function() {
				rippleLock = false;
			}, 250);
		}
	}, delay)
}

var innerFrameLock = false;
var rebuildInnerFrame = function() {
	if (!innerFrameLock) {
		innerFrameLock = true;
		var currentTime = 0;
		running = true;

		// Inner frame triangles
		// Top left
		parentSelector = '#innerFrameTopLeftTriangle';
		mDrawLine('.border', currentTime, 1000);
		mDrawLine('.zigzag', currentTime+750, 1000);
		mDrawLines('.zigzagLines', currentTime+1750, 125, 500);
		parentSelector = '#innerFrameTopLeftTriangleBottomLeftBox';
		mDrawLine('.border', currentTime+1000, 500);
		mDrawLines('.slant', currentTime+1500, 125, 500);
		parentSelector = '#innerFrameTopLeftTriangleLargeBox';
		mDrawLine('.border', currentTime+1250, 500);
		mDrawLines('.slant', currentTime+1750, 125, 500);
		parentSelector = '#innerFrameTopLeftTriangleTopRightBox';
		mDrawLine('.border', currentTime+1500, 500);
		mDrawLines('.slant', currentTime+2000, 125, 500);
		// Bottom right
		parentSelector = '#innerFrameBottomRightTriangle';
		mDrawLine('.border', currentTime, 1000);
		mDrawLine('.zigzag', currentTime+750, 1000);
		mDrawLines('.zigzagLines', currentTime+1750, 125, 500);
		parentSelector = '#innerFrameBottomRightTriangleTopRightBox';
		mDrawLine('.border', currentTime+1000, 500);
		mDrawLines('.slant', currentTime+1500, 125, 500);
		parentSelector = '#innerFrameBottomRightTriangleLargeBox';
		mDrawLine('.border', currentTime+1250, 500);
		mDrawLines('.slant', currentTime+1750, 125, 500);
		parentSelector = '#innerFrameBottomRightTriangleBottomLeftBox';
		mDrawLine('.border', currentTime+1500, 500);
		mDrawLines('.slant', currentTime+2000, 125, 500);

		currentTime += 1000;

		// Inner frame
		parentSelector = '#innerFrame';
		// bars
		mDrawLines('.frameRightBar', currentTime, 250, 500);
		mDrawLines('.frameTopBar', currentTime+125, 250, 500);
		mDrawLines('.frameLeftBar', currentTime, 250, 500);
		mDrawLines('.frameBottomBar', currentTime+125, 250, 500);
		// notches
		mDrawLines('#frameRightNotches0 line', currentTime+125, 15, 100);
		mDrawLines('#frameRightNotches1 line', currentTime+375, 30, 100);
		mDrawLines('#frameRightNotches2 line', currentTime+625, 60, 100);
		mDrawLines('#frameRightNotches3 line', currentTime+875, 120, 100);
		mDrawLines('#frameTopNotches0 line', currentTime+250, 15, 100);
		mDrawLines('#frameTopNotches1 line', currentTime+500, 30, 100);
		mDrawLines('#frameTopNotches2 line', currentTime+750, 60, 100);
		mDrawLines('#frameTopNotches3 line', currentTime+1000, 120, 100);
		mDrawLines('#frameLeftNotches0 line', currentTime+125, 15, 100);
		mDrawLines('#frameLeftNotches1 line', currentTime+375, 30, 100);
		mDrawLines('#frameLeftNotches2 line', currentTime+625, 60, 100);
		mDrawLines('#frameLeftNotches3 line', currentTime+875, 120, 100);
		mDrawLines('#frameBottomNotches0 line', currentTime+250, 15, 100);
		mDrawLines('#frameBottomNotches1 line', currentTime+500, 30, 100);
		mDrawLines('#frameBottomNotches2 line', currentTime+750, 60, 100);
		mDrawLines('#frameBottomNotches3 line', currentTime+1000, 120, 100);
		
		currentTime += 1000;

		// Inner frame shadows
		parentSelector = '#innerFrameShadowTopRight';
		mDrawLines('.short', currentTime+250, 25, 100);
		mDrawLines('.long', currentTime+350, 20, 100);
		parentSelector = '#innerFrameShadowBottomLeft';
		mDrawLines('.short', currentTime+250, 25, 100);
		mDrawLines('.long', currentTime+350, 20, 100);

		currentTime += 1000;

		// Inner frame container
		parentSelector = '#innerFrameContainer';
		mDrawLine('.left', currentTime, 1000);
		mDrawLine('.right', currentTime, 1000);
		parentSelector = '#innerFrameContainerLeftTriangle';
		mDrawLine('.border', currentTime+750, 500);
		mDrawLines('line', currentTime+1000, 0, 250);
		parentSelector = '#innerFrameContainerRightTriangle';
		mDrawLine('.border', currentTime+750, 500);
		mDrawLines('line', currentTime+1000, 0, 250);

		// Bottom outside triangles
		parentSelector = '#bltriangle';
		mDrawLine('.border', currentTime+250, 500);
		mDrawLines('.slant', currentTime+750, 50, 100);
		parentSelector = '#brtriangle';
		mDrawLine('.border', currentTime+250, 500);
		mDrawLines('.slant', currentTime+750, 50, 100);

		window.setTimeout(function() {
			innerFrameLock = false;
		}, 10000);
	}
}
