$(document).ready(function() {

    // Add color to title upon hover
    $('.svg-down-circle').hover(function() {
        $('#designer, #developer, #entrepreneur').addClass('hover');
    }, function() {
        $('#designer, #developer, #entrepreneur').removeClass('hover');
    });

});

function openPage() {
    console.log('wat');
    $('.container').addClass('open');
    $('.content .down-circle').fadeOut(250, function() {
        $('.col-2').fadeIn(250, function() {
            $('.col-1').fadeIn(250, function() {
                loadSections();
            });
        });
    });
    $('#designer, #developer, #entrepreneur, .container .header h1, .container .header h2').removeClass('hover');
}

function loadSections() {
    $('#skills').children('.skills').children('.skill').each(function(index, el) {
        $(this).delay((index * 50)).animate({opacity: 1}, 250);
    });
}