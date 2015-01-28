$(window).load(function() {
    /* Act on the event */
    $(".ellipsis").dotdotdot({
        watch: window
    });
});

$(document).ready(function() {
    var videoWidth = $('.aspect16-9').parent('.thumb').width();    
    $('.aspect16-9').width(videoWidth);
    $('.aspect16-9').height((videoWidth / 16) * 9);

    var navOpen = false;
    $('.navbar-toggle').click(function(event) {
        if (navOpen) {
            $(this).removeClass('navbar-open');
            $(this).children('i').animate({
                opacity: 0 },
                250, function() {
                    $(this).removeClass('fa-close').addClass('fa-bars');
                    $(this).animate({opacity: 1}, 250);
            });
            navOpen = false;
        }
        else {
            $(this).addClass('navbar-open');
            $(this).children('i').animate({
                opacity: 0 },
                250, function() {
                    $(this).removeClass('fa-bars').addClass('fa-close');
                    $(this).animate({opacity: 1}, 250);
            });
            navOpen = true;
        }
    });
});
