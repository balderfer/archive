var radius = 74;

// Calculates the SVG path d attribute
// r: radius
// cx: x-coordinate of center
// cy: y-coordinate of center
// initPos: 0=top, 1=right, 2=bottom, 3=left
// direction: 0=clockwise, 1=counterclockwise
var getD = function(r, cx, cy, initPos, direction) {
	r = parseInt(r);
	cx = parseInt(cx);
	cy = parseInt(cy);
	if (direction === 0) {
		var rot = '0,1';
	}
	else {
		var rot = '1,0';
	}
	var d = 'M';
	if (initPos === 0) {
		d += cx + ',' + (cy - r);
		d += ' a ';
		d += r + ',' + r;
		d += ' 0 ' + rot + ' ';
		d += '0,' + (2 * r);
		d += ' ';
		d += r + ',' + r;
		d += ' 0 ' + rot + ' ';
		d += '0,' + (-2 * r);
	}
	if (initPos === 1) {
		d += (cx + r) + ',' + cy;
		d += ' a ';
		d += r + ',' + r;
		d += ' 0 ' + rot + ' ';
		d += (-2 * r) + ',0';
		d += ' ';
		d += r + ',' + r;
		d += ' 0 ' + rot + ' ';
		d += (2 * r) + ',0';
	}
	if (initPos === 2) {
		d += cx + ',' + (cy + r);
		d += ' a ';
		d += r + ',' + r;
		d += ' 0 ' + rot + ' ';
		d += '0,' + (-2 * r);
		d += ' ';
		d += r + ',' + r;
		d += ' 0 ' + rot + ' ';
		d += '0,' + (2 * r);
	}
	if (initPos === 3) {
		d += (cx - r) + ',' + cy;
		d += ' a ';
		d += r + ',' + r;
		d += ' 0 ' + rot + ' ';
		d += (2 * r) + ',0';
		d += ' ';
		d += r + ',' + r;
		d += ' 0 ' + rot + ' ';
		d += (-2 * r) + ',0';
	}
	return d;
}

$(document).ready(function() {
	$('#lsquare').mouseenter(function(event) {
		$('#lsquare').scaleCircleTo('#lcircle0', 250, 0.8);
		$('#lsquare').scaleCircleTo('#lcircle1', 250, 0.7);
		$('#lsquare').scaleCircleTo('#lcircle2', 250, 0.6);
	});
});

var scaleCircleTo = function(el, duration, scale) {
	if ($(el).attr('data-lock') === 'locked') {
		return;
	}
	else {
		$(el).attr('data-lock', 'locked');
	}

	$(this).mouseleave(function(event) {
		/* Act on the event */
	});

	var i = 0;
	var maxi = (60 * (duration / 1000));

	var r = $(el).attr('data-radius');
	var minr = r * scale;
	var maxr = r;
	var cx = $(el).attr('data-cx');
	var cy = $(el).attr('data-cy');

	var stepSize = (maxr - minr) / (maxi / 2);

	var interval = window.setInterval(function() {
		if (i < maxi / 2) {
			r -= stepSize;
			$(el).attr('d', getD(r, cx, cy, 2, 0));
		}
		else {
			r += stepSize;
			if (r > maxr) r = maxr;
			$(el).attr('d', getD(r, cx, cy, 2, 0));
		}

		if (i < maxi) {
			i++
		}
		else {
			window.clearInterval(interval);
		}
	}, (1000/60));
}