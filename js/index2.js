var menuOpen = false;

function adjustHeight() {
    var windowWidth = $(window).width();
    var unitHeight = 0;
    if (windowWidth > 768) {
        // height = 790 - ((1280 - wW) / (512 / 22))
        unitHeight = (windowWidth / 12) * 0.67;
        $(".height-1").css("height", unitHeight);
        $(".height-2").css("height", (unitHeight * 2));
        $(".height-3").css("height", (unitHeight * 3));
        $(".height-4").css("height", (unitHeight * 4));
        $(".height-5").css("height", (unitHeight * 5));
        $(".height-6").css("height", (unitHeight * 6));
        $(".height-7").css("height", (unitHeight * 7));
        $(".height-8").css("height", (unitHeight * 8));
        $(".height-9").css("height", (unitHeight * 9));
        $(".height-10").css("height", (unitHeight * 10));
        $(".height-11").css("height", (unitHeight * 11));
        $(".height-12").css("height", (unitHeight * 12));
    } else {
        // height = 540px
        unitHeight = "auto";
        $(".height-1").css("height", unitHeight);
        $(".height-2").css("height", unitHeight);
        $(".height-3").css("height", unitHeight);
        $(".height-4").css("height", unitHeight);
        $(".height-5").css("height", unitHeight);
        $(".height-6").css("height", unitHeight);
        $(".height-7").css("height", unitHeight);
        $(".height-8").css("height", unitHeight);
        $(".height-9").css("height", unitHeight);
        $(".height-10").css("height", unitHeight);
        $(".height-11").css("height", unitHeight);
        $(".height-12").css("height", unitHeight);
    }
}

$(window).load(function() {
    /* Act on the event */
    $(".ellipsis").dotdotdot({
        watch: window
    });
});

$(document).ready(function() {
    adjustHeight();

    $(window).resize(function(event) {
        /* Act on the event */
        adjustHeight();
    });
    $(".nav-mobile-home").click(function(event) {
        /* Act on the event */
        document.location = "http://benalderfer.com/";
    });
    $(".nav-mobile-journal").click(function(event) {
        /* Act on the event */
        document.location = "http://benalderfer.com/journal.html";
    });
    $(".nav-mobile-work").click(function(event) {
        /* Act on the event */
        document.location = "http://benalderfer.com/work.html";
    });
    $(".nav-mobile").click(function(event) {
        if (menuOpen) {
            $(".nav").css({
                height: '60px'
            });
            $(".nav-mobile-work").fadeOut('fast', function() {
                $(".nav-mobile-journal").fadeOut('fast', function() {
                    $(".nav-mobile-home").fadeOut('fast', function() {

                    });
                });
            });

            menuOpen = false;
        } else {
            menuOpen = true;

            $(".nav-mobile-home").fadeIn('fast', function() {
                $(".nav-mobile-journal").fadeIn('fast', function() {
                    $(".nav-mobile-work").fadeIn('fast', function() {
                        $(".nav").css({
                            height: '252px'
                        });

                    });
                });
            });

        }
    });
});