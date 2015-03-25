jQuery.fn.getPath = function () {
    if (this.length != 1) throw 'Requires one element.';

    var path, node = this;
    while (node.length) {
        var realNode = node[0], name = realNode.localName;
        if (!name) break;
        name = name.toLowerCase();

        var parent = node.parent();

        var siblings = parent.children(name);
        if (siblings.length > 1) { 
            name += ':eq(' + siblings.index(realNode) + ')';
        }

        path = name + (path ? '>' + path : '');
        node = parent;
    }

    return path;
};

var getRectLength = function(selector) {
	var width = selector.getAttribute('width');
	var height = selector.getAttribute('height');
	return 2*width + 2*height;
}

var getLineLength = function(selector) {
	var x1 = selector.getAttribute('x1');
	var y1 = selector.getAttribute('y1');
	var x2 = selector.getAttribute('x2');
	var y2 = selector.getAttribute('y2');
	return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
}

$(document).ready(function() {
	
	// Inner square
	var isb = document.querySelector('#innerSquareBorder');
	drawPath(isb, getRectLength(isb));

	var isTimer = 0;
	window.setTimeout(function() {
		$('#innerSquare circle').each(function(index, el) {
			window.setTimeout(function() {
				$(el).fadeIn(500);
			}, isTimer);
			isTimer += 125;
		});
	}, 2000);

	// Inner Frame triangle top left border
	var iftltb = document.querySelector('#innerFrameTopLeftTriangle .border');
	window.setTimeout(function() {
		var iftltbLength = iftltb.getTotalLength();
		console.log(iftltbLength);
		drawPath(iftltb, iftltbLength);
	}, 2000);
	// Inner Frame triangle top left border
	var ifbrtb = document.querySelector('#innerFrameBottomRightTriangle .border');
	window.setTimeout(function() {
		var ifbrtbLength = ifbrtb.getTotalLength();
		console.log(ifbrtbLength);
		drawPath(ifbrtb, ifbrtbLength);
	}, 2000);

	// Inner Frame triangle top left zigzag
	var iftltzz = document.querySelector('#innerFrameTopLeftTriangle .zigzag');
	window.setTimeout(function() {
		var iftltzzLength = iftltzz.getTotalLength();
		console.log(iftltzzLength);
		drawPath(iftltzz, iftltzzLength);
	}, 2000);
	// Inner Frame triangle bottom right zigzag
	var ifbrtzz = document.querySelector('#innerFrameBottomRightTriangle .zigzag');
	window.setTimeout(function() {
		var ifbrtzzLength = ifbrtzz.getTotalLength();
		console.log(ifbrtzzLength);
		drawPath(ifbrtzz, ifbrtzzLength);
	}, 2000);

	// Inner Frame triangle top left zigzag lines
	var iftltzzl = document.querySelectorAll('#innerFrameTopLeftTriangle .zigzagLines');
	iftltzzlTimer = 2500;
	[].forEach.call(iftltzzl, function(el) {
		window.setTimeout(function() {
			var length = el.getTotalLength();
			drawPath(el, length);
		}, iftltzzlTimer);
		iftltzzlTimer += 100;
	});
	// Inner Frame triangle bottom right zigzag lines
	var ifbrtzzl = document.querySelectorAll('#innerFrameBottomRightTriangle .zigzagLines');
	ifbrtzzlTimer = 2500;
	[].forEach.call(ifbrtzzl, function(el) {
		window.setTimeout(function() {
			var length = el.getTotalLength();
			drawPath(el, length);
		}, ifbrtzzlTimer);
		ifbrtzzlTimer += 100;
	});

	// Inner Frame triangle top left bl box
	var iftltblboxb = document.querySelector('#innerFrameTopLeftTriangleBottomLeftBox .border');
	window.setTimeout(function() {
		drawPath(iftltblboxb, getRectLength(iftltblboxb));
		var iftltbllines = document.querySelectorAll('#innerFrameTopLeftTriangleBottomLeftBox path');
		console.log('lines: ' + iftltbllines);
		var iftltbllinesTimer = 2000;
		[].forEach.call(iftltbllines, function(el) {
			var length = el.getTotalLength();
			drawPathWithDelaySpeed(el, length, iftltbllinesTimer, 0.5);
			iftltbllinesTimer += 200;
		});
	},3000);
	// Inner Frame triangle bottom right tr box
	var ifbrttrboxb = document.querySelector('#innerFrameBottomRightTriangleTopRightBox .border');
	window.setTimeout(function() {
		drawPath(ifbrttrboxb, getRectLength(ifbrttrboxb));
		var ifbrttrlines = document.querySelectorAll('#innerFrameBottomRightTriangleTopRightBox path');
		console.log('lines: ' + ifbrttrlines);
		var ifbrttrlinesTimer = 2000;
		[].forEach.call(ifbrttrlines, function(el) {
			var length = el.getTotalLength();
			drawPathWithDelaySpeed(el, length, ifbrttrlinesTimer, 0.5);
			ifbrttrlinesTimer += 200;
		});
	},3000);
	// Inner Frame triangle top left tr box
	var iftlttrboxb = document.querySelector('#innerFrameTopLeftTriangleTopRightBox .border');
	window.setTimeout(function() {
		drawPath(iftlttrboxb, getRectLength(iftlttrboxb));
		var iftlttrlines = document.querySelectorAll('#innerFrameTopLeftTriangleTopRightBox path');
		console.log('lines: ' + iftlttrlines);
		var iftlttrlinesTimer = 2000;
		[].forEach.call(iftlttrlines, function(el) {
			var length = el.getTotalLength();
			drawPathWithDelaySpeed(el, length, iftlttrlinesTimer, 0.5);
			iftlttrlinesTimer += 200;
		});
	},3000);
	// Inner Frame triangle bottom right bl box
	var ifbrtblboxb = document.querySelector('#innerFrameBottomRightTriangleBottomLeftBox .border');
	window.setTimeout(function() {
		drawPath(ifbrtblboxb, getRectLength(ifbrtblboxb));
		var ifbrtbllines = document.querySelectorAll('#innerFrameBottomRightTriangleBottomLeftBox path');
		console.log('lines: ' + ifbrtbllines);
		var ifbrtbllinesTimer = 2000;
		[].forEach.call(ifbrtbllines, function(el) {
			var length = el.getTotalLength();
			drawPathWithDelaySpeed(el, length, ifbrtbllinesTimer, 0.5);
			ifbrtbllinesTimer += 200;
		});
	},3000);

	// Inner Frame triangle top left l box
	var iftltlboxb = document.querySelector('#innerFrameTopLeftTriangleLargeBox .border');
	window.setTimeout(function() {
		drawPath(iftltlboxb, getRectLength(iftltlboxb));
		var iftltllines = document.querySelectorAll('#innerFrameTopLeftTriangleLargeBox path');
		console.log('lines: ' + iftltllines);
		var iftltllinesTimer = 2000;
		[].forEach.call(iftltllines, function(el) {
			var length = el.getTotalLength();
			drawPathWithDelaySpeed(el, length, iftltllinesTimer, 0.25);
			iftltllinesTimer += 150;
		});
	},3500);
	// Inner Frame triangle bottom right l box
	var ifbrtlboxb = document.querySelector('#innerFrameBottomRightTriangleLargeBox .border');
	window.setTimeout(function() {
		drawPath(ifbrtlboxb, getRectLength(ifbrtlboxb));
		var ifbrtllines = document.querySelectorAll('#innerFrameBottomRightTriangleLargeBox path');
		console.log('lines: ' + ifbrtllines);
		var ifbrtllinesTimer = 2000;
		[].forEach.call(ifbrtllines, function(el) {
			var length = el.getTotalLength();
			drawPathWithDelaySpeed(el, length, ifbrtllinesTimer, 0.25);
			ifbrtllinesTimer += 150;
		});
	},3500);



	// Inner frame animations ------------------------------------------------------------------
	var iftrTimer = 2000;
	for (var i = 0; i < 5; i++) {
		var selector = document.querySelector('#frameRightBar' + i);
		drawPathWithDelay(selector, getLineLength(selector), iftrTimer);
		iftrTimer += 250;
		var selector = document.querySelector('#frameTopBar' + i);
		drawPathWithDelay(selector, getLineLength(selector), iftrTimer);
		iftrTimer += 250;
	}
	var ifblTimer = 2000;
	for (var i = 0; i < 5; i++) {
		var selector = document.querySelector('#frameLeftBar' + i);
		drawPathWithDelay(selector, getLineLength(selector), ifblTimer);
		ifblTimer += 250;
		var selector = document.querySelector('#frameBottomBar' + i);
		drawPathWithDelay(selector, getLineLength(selector), ifblTimer);
		ifblTimer += 250;
	}

	// notches
	var iftrnDelay = 4000;
	for (var i = 0; i < 4; i++) {
		iftrnTimer = iftrnDelay;
		var rightNotches = document.querySelectorAll('#frameRightNotches' + i + ' line');
		[].forEach.call(rightNotches, function(el) {
			drawPathWithDelaySpeed(el, getLineLength(el), iftrnTimer, 0.5);
			iftrnTimer += 20 * (i+1);
		});
		iftrnDelay += 250;
		iftrnTimer = iftrnDelay;
		var topNotches = document.querySelectorAll('#frameTopNotches' + i + ' line');
		[].forEach.call(topNotches, function(el) {
			drawPathWithDelaySpeed(el, getLineLength(el), iftrnTimer, 0.5);
			iftrnTimer += 20 * (i+1);
		});
		iftrnDelay += 250;
	}
	var ifblnDelay = 4000;
	for (var i = 0; i < 4; i++) {
		ifblnTimer = ifblnDelay;
		var leftNotches = document.querySelectorAll('#frameLeftNotches' + i + ' line');
		[].forEach.call(leftNotches, function(el) {
			drawPathWithDelaySpeed(el, getLineLength(el), ifblnTimer, 0.5);
			ifblnTimer += 20 * (i+1);
		});
		ifblnDelay += 250;
		ifblnTimer = ifblnDelay;
		var bottomNotches = document.querySelectorAll('#frameBottomNotches' + i + ' line');
		[].forEach.call(bottomNotches, function(el) {
			drawPathWithDelaySpeed(el, getLineLength(el), ifblnTimer, 0.5);
			ifblnTimer += 20 * (i+1);
		});
		ifblnDelay += 250;
	}





	// shadows ---------------------------------------------------------

	// top right shadows
	var topRightShort = document.querySelectorAll('#innerFrameShadowTopRight .short');
	var topRightShortDelay = 6000;
	[].forEach.call(topRightShort, function(el) {
		drawPathWithDelaySpeed(el, getLineLength(el), topRightShortDelay, 0.5);
		topRightShortDelay += 100;
	});
	var topRightLong = document.querySelectorAll('#innerFrameShadowTopRight .long');
	var topRightLongDelay = 6250;
	[].forEach.call(topRightLong, function(el) {
		drawPathWithDelaySpeed(el, getLineLength(el), topRightLongDelay, 0.5);
		topRightLongDelay += 75;
	});

	// bottom left shadows
	var bottomLeftShort = document.querySelectorAll('#innerFrameShadowBottomLeft .short');
	var bottomLeftShortDelay = 6000;
	[].forEach.call(bottomLeftShort, function(el) {
		drawPathWithDelaySpeed(el, getLineLength(el), bottomLeftShortDelay, 0.5);
		bottomLeftShortDelay += 100;
	});
	var bottomLeftLong = document.querySelectorAll('#innerFrameShadowBottomLeft .long');
	bottomLeftLongDelay = 6250;
	[].forEach.call(bottomLeftLong, function(el) {
		drawPathWithDelaySpeed(el, getLineLength(el), bottomLeftLongDelay, 0.5);
		bottomLeftLongDelay += 75;
	});



	// inner frame container ---------------------------------

	var ifcontainerleft = document.querySelector('#innerFrameContainerLeft');
	drawPathWithDelaySpeed(ifcontainerleft, ifcontainerleft.getTotalLength(), 7500, 2);

	var ifcontainerright = document.querySelector('#innerFrameContainerRight');
	drawPathWithDelaySpeed(ifcontainerright, ifcontainerright.getTotalLength(), 7500, 2);


	// left triangle
	var ifcltb = document.querySelector('#innerFrameContainerLeftTriangle .border');
	drawPathWithDelaySpeed(ifcltb, ifcltb.getTotalLength(), 9000, 1);
	var ifcltl = document.querySelectorAll('#innerFrameContainerLeftTriangle line');
	var ifcltlTimer = 10000;
	var i = 0;
	[].forEach.call(ifcltl, function(el) {
		drawPathWithDelaySpeed(el, getLineLength(el), ifcltlTimer, 0.25);
		if (i == 0) i++;
		else {
			i--;
			ifcltlTimer += 100;
		}
	});

	// right triangle
	var ifcrtb = document.querySelector('#innerFrameContainerRightTriangle .border');
	drawPathWithDelaySpeed(ifcrtb, ifcrtb.getTotalLength(), 9000, 1);
	var ifcrtl = document.querySelectorAll('#innerFrameContainerRightTriangle line');
	var ifcrtlTimer = 10000;
	var i = 0;
	[].forEach.call(ifcrtl, function(el) {
		drawPathWithDelaySpeed(el, getLineLength(el), ifcrtlTimer, 0.25);
		if (i == 0) i++;
		else {
			i--;
			ifcrtlTimer += 100;
		}
	});

});

var drawPath = function(selector, length) {
	selector.style.display = "block";
	selector.style.transition = selector.style.WebkitTransition = 'none';
	// Set up the starting positions
	selector.style.strokeDasharray = length + ' ' + length;
	selector.style.strokeDashoffset = length;
	// Trigger a layout so styles are calculated & the browser
	// picks up the starting position before animating
	selector.getBoundingClientRect();
	// Define our transition
	selector.style.transition = selector.style.WebkitTransition =
	  'stroke-dashoffset 2s ease-in-out';
	// Go!
	selector.style.strokeDashoffset = '0';
}

var drawPathWithDelay = function(selector, length, delay) {
	window.setTimeout(function() {
		selector.style.display = "block";
		selector.style.transition = selector.style.WebkitTransition = 'none';
		// Set up the starting positions
		selector.style.strokeDasharray = length + ' ' + length;
		selector.style.strokeDashoffset = length;
		// Trigger a layout so styles are calculated & the browser
		// picks up the starting position before animating
		selector.getBoundingClientRect();
		// Define our transition
		selector.style.transition = selector.style.WebkitTransition =
		  'stroke-dashoffset 2s ease-in-out';
		// Go!
		selector.style.strokeDashoffset = '0';
	}, delay);
}

var drawPathWithDelaySpeed = function(selector, length, delay, speed) {
	window.setTimeout(function() {
		selector.style.display = "block";
		selector.style.transition = selector.style.WebkitTransition = 'none';
		// Set up the starting positions
		selector.style.strokeDasharray = length + ' ' + length;
		selector.style.strokeDashoffset = length;
		// Trigger a layout so styles are calculated & the browser
		// picks up the starting position before animating
		selector.getBoundingClientRect();
		// Define our transition
		selector.style.transition = selector.style.WebkitTransition =
		  'stroke-dashoffset ' + speed + 's ease-in-out';
		// Go!
		selector.style.strokeDashoffset = '0';
	}, delay);
}