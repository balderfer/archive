var panels = [],
    windowHeight,
    locked = false,
    currentPanel = 2;

var init = function() {
  // $('html, body').scrollTop(0);
  $('.panel').each(function(index, el) {
    $(el).attr('data-index', index);
    panels.push(el);
  });
};

var paginate = function(steps) {
  if ((currentPanel === 0 && steps < 0) || (currentPanel === panels.length - 1 && steps > 0)) return;

  currentPanel += steps;

  var newPosition = windowHeight * currentPanel;

  locked = true;
  $('html, body').animate({
    scrollTop: newPosition
  }, 200, function() {
    locked = false;
  });
};

var listener = function() {
  $(document).on("keydown", function(e) {
    var code = e.which;
    if (code == 40) {
      if (!locked) {
        e.preventDefault;
        paginate(1);
      }
    } else if (code == 38) {
      if (!locked) {
        e.preventDefault;
        paginate(-1);
      }
    }
  });
};

$(document).ready(function() {
  windowHeight = window.innerHeight;
  init();
  listener();
});