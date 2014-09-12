var lock = false;
var locked = true;
var scrolled = false;
var stop = false;

$(document).ready(function() {

    // If scrolled
    $(window).scroll(function(event) {
        if (locked) {
            locked = false;
            $('.container').animate({
                'padding-top': '2em'},
                500, function() {
                    $('.header').addClass('scrolled');
                // $('.container').css('padding-top', '2em');
            });
            $('.container').addClass('open');
            $('.content .down-circle').fadeOut(250, function() {
                $('.col-1, .col-2, .col-3, .footer').fadeIn(250, function() {
                    loadSections();
                });
            });
            $('#designer, #developer, #entrepreneur, .container .header h1, .container .header h2').removeClass('hover');
        }
        else {
            var scrollHeight = $(this).scrollTop();
            var y1 = $('#static-col-1').height();
            var y2 = $('#col-2').height();
            var windowH = $(window).height();
            var b2 = $('#col-2').offset().top + y2;
            var deltaD = b2 - windowH + 32;
            var newTop = scrollHeight * ((y2 - y1) / deltaD);
            console.log(b2);
            var offset = $('#projects').offset();
            if (scrollHeight <= 0) {
                $('#static-col-1').attr('style', '');
            }
            else if ((scrollHeight < (deltaD))) {
                $('#static-col-1').css('top', newTop);
                //stop = true;
            }
            else if (scrollHeight > deltaD) {
                $('#static-col-1').css('top', y2 - y1);
            }
        }
    });





    $('#garmin').hover(function() {
        $('#illustrator, #photoshop, #css, #html, #javascript, #ideation').addClass('hover');
    }, function() {
        $('#illustrator, #photoshop, #css, #html, #javascript, #ideation').removeClass('hover');
    });
    $('#awa').hover(function() {
        $('#illustrator, #css, #html, #javascript, #git, #ideation, #ambition').addClass('hover');
    }, function() {
        $('#illustrator, #css, #html, #javascript, #git, #ideation, #ambition').removeClass('hover');
    });
    $('#freelance').hover(function() {
        $('#illustrator, #css, #html, #javascript, #git, #ideation').addClass('hover');
    }, function() {
        $('#illustrator, #css, #html, #javascript, #git, #ideation').removeClass('hover');
    });
    $('#vivaldi').hover(function() {
        $('#illustrator, #css, #html, #javascript, #git, #ideation').addClass('hover');
    }, function() {
        $('#illustrator, #css, #html, #javascript, #git, #ideation').removeClass('hover');
    });
    $('#palettetown').hover(function() {
        $('#css, #html, #javascript').addClass('hover');
    }, function() {
        $('#css, #html, #javascript').removeClass('hover');
    });
    $('#fitr').hover(function() {
        $('#illustrator, #java, #git, #ideation').addClass('hover');
    }, function() {
        $('#illustrator, #java, #git, #ideation').removeClass('hover');
    });
    $('#bowlbouncer').hover(function() {
        $('#illustrator, #ideation').addClass('hover');
    }, function() {
        $('#illustrator, #ideation').removeClass('hover');
    });



    // Add color to title upon hover
    $('.svg-down-circle').hover(function() {
        $('#designer, #developer, #entrepreneur').addClass('hover');
    }, function() {
        $('#designer, #developer, #entrepreneur').removeClass('hover');
    });

    // Fade on hover per category
    $('#designer').hover(function() {
        if (!lock) {
            $('.develop, .entr').animate({opacity: 0.2}, 250);
        }
    }, function() {
        if (!lock) {
            $('.develop, .entr').animate({opacity: 1}, 250);
        }
    });
    $('#developer').hover(function() {
        if (!lock) {
            $('.design, .entr').animate({opacity: 0.2}, 250);
        }
    }, function() {
        if (!lock) {
            $('.design, .entr').animate({opacity: 1}, 250);
        }
    });
    $('#entrepreneur').hover(function() {
        if (!lock) {
            $('.develop, .design').animate({opacity: 0.2}, 250);
        }
    }, function() {
        if (!lock) {
            $('.develop, .design').animate({opacity: 1}, 250);
        }
    });

    // Fade on click per category
    $('#designer').click(function(event) {
        if (!$(this).hasClass('hover')) {
            $('.design').stop().animate({opacity: 1}, 250);
            $('.develop, .entr').stop().animate({opacity: 0.2}, 250);
            $('#designer, #developer, #entrepreneur').removeClass('hover');
            $(this).addClass('hover');
            lock = true;
        }
        else {
            $('.design, .develop, .entr').stop().animate({opacity: 1}, 250);
            $('#designer, #developer, #entrepreneur').removeClass('hover');
            lock = false;
        }
    });
    $('#developer').click(function(event) {
        if (!$(this).hasClass('hover')) {
            $('.develop').stop().animate({opacity: 1}, 250);
            $('.design, .entr').stop().animate({opacity: 0.2}, 250);
            $('#designer, #developer, #entrepreneur').removeClass('hover');
            $(this).addClass('hover');
            lock = true;
        }
        else {
            $('.design, .develop, .entr').stop().animate({opacity: 1}, 250);
            $('#designer, #developer, #entrepreneur').removeClass('hover');
            lock = false;
        }
    });
    $('#entrepreneur').click(function(event) {
        if (!$(this).hasClass('hover')) {
            $('.entr').stop().animate({opacity: 1}, 250);
            $('.design, .develop').stop().animate({opacity: 0.2}, 250);
            $('#designer, #developer, #entrepreneur').removeClass('hover');
            $(this).addClass('hover');
            lock = true;
        }
        else {
            $('.design, .develop, .entr').stop().animate({opacity: 1}, 250);
            $('#designer, #developer, #entrepreneur').removeClass('hover');
            lock = false;
        }
    });
    $('.benalderfer').click(function(event) {
        $('.design, .develop, .entr').stop().animate({opacity: 1}, 250);
        $('#designer, #developer, #entrepreneur').removeClass('hover');
        lock = false;
    });


});

function openPage() {
    locked = false;
    $('.container').animate({
        'padding-top': '-10em'},
        250, function() {
        $('.header').addClass('scrolled');
        $('.container').css('padding-top', '2em');
    });
    $('.container').addClass('open');
    $('.content .down-circle').fadeOut(250, function() {
        $('.col-1, .col-2, .col-3, .footer').fadeIn(250, function() {
            loadSections();
        });
    });
    $('#designer, #developer, #entrepreneur, .container .header h1, .container .header h2').removeClass('hover');
}

function loadSections() {
    $('#skills').children('.skills').children('.skill').each(function(index, el) {
        $(this).delay((index * 50)).animate({opacity: 1}, 250);
    });
}