var index = 0;

function resizeBubbles() {
    var bubbleWidth = $('#baseBubble').width();
    var bubbleMargin = $('#baseBubble + .col').css('margin-left');
    bubbleMargin = Number(bubbleMargin.substring(0, bubbleMargin.length - 2));
    $('.item, .item-group, .mobile-item, .menu-toggle, .menu-toggle .button').height(bubbleWidth);
    $('.item-group .item, .mobile-item, .menu-toggle, .menu-toggle .button').width(bubbleWidth);
    $('.item-group .item').css('margin-left', bubbleMargin);
    $('.item-group').each(function(index, el) {
        $(el).children('.item:first').css('margin-left', '0');
        $(el).children('.item:last').css({
            'float': 'right',
            'margin-left': '0'
        });
    });
    $('.section.group').css('margin-bottom', bubbleMargin);
        
}

function repositionContainer() {
    var cHeight = $('.container').height();
    var wHeight = $(window).height();
    $('.container').css('margin-top', ((wHeight - cHeight) / 2) + 'px');
}

function flyOut(self, target) {
    console.log(self);
    // $(self).removeClass('fadeInLeftBig');
    $(self).addClass('fadeOutRightBig');
    window.setTimeout(function() {
        $('body').animate({opacity: 0}, 250, function() {
            window.location.href = target;
        });
    }, 100);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function animateDropBubbles(array) {
    $(array[index]).addClass('animated bounceInDown');
    index++;
    if (array.length > index) {
        window.setTimeout(function() {
            animateDropBubbles(array);
        }, 100);
    }
    else {

    }
}

$(document).ready(function() {
    var dropBubbleArray = [];
    $('.dropBubble').each(function(index, el) {
        dropBubbleArray.push(el);
    });
    shuffle(dropBubbleArray);

    resizeBubbles();
    repositionContainer();
    $(window).resize(function(event) {
        resizeBubbles();
        repositionContainer();
    });


    if ($(window).width() > 768) {
        $('.item-group').hover(function() {
            $(this).children('.item').addClass('animated pulse');
            $(this).children('.tooltip').addClass('animated fadeInLeftBig');
        }, function() {
            $(this).children('.item').removeClass('animated pulse');
            $(this).children('.tooltip').removeClass('fadeInLeftBig');
        });
    }

    animateDropBubbles(dropBubbleArray);

});
