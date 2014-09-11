var lock = false;
var scrolled = false;

$(document).ready(function() {

    // If scrolled
    $(window).scroll(function(event) {
        if (!scrolled) {
            openPage();
            scrolled = true;
        }
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
        $('.design').stop().animate({opacity: 1}, 250);
        $('.develop, .entr').stop().animate({opacity: 0.2}, 250);
        $('#designer, #developer, #entrepreneur').removeClass('hover');
        $(this).addClass('hover');
        lock = true;
        console.log('Locked!' + lock);
    });
    $('#developer').click(function(event) {
        $('.develop').stop().animate({opacity: 1}, 250);
        $('.design, .entr').stop().animate({opacity: 0.2}, 250);
        $('#designer, #developer, #entrepreneur').removeClass('hover');
        $(this).addClass('hover');
        lock = true;
        console.log('Locked!' + lock);
    });
    $('#entrepreneur').click(function(event) {
        $('.entr').stop().animate({opacity: 1}, 250);
        $('.design, .develop').stop().animate({opacity: 0.2}, 250);
        $('#designer, #developer, #entrepreneur').removeClass('hover');
        $(this).addClass('hover');
        lock = true;
        console.log('Locked!' + lock);
    });
    $('.benalderfer').click(function(event) {
        $('.design, .develop, .entr').stop().animate({opacity: 1}, 250);
        $('#designer, #developer, #entrepreneur').removeClass('hover');
        lock = false;
    });


});

function openPage() {
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