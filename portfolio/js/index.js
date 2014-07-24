var unicornVisible = false;

$(document).ready(function() {
    $(".nav h2").hover(function(event) {
        event.stopPropagation();
        $(this).animate({
                'margin-left': '10px',
            },
            200, "linear"
        );
    }, function() {
        $(this).animate({
                'margin-left': '0',
            },
            200
        );
    });

    $(".nav h2").click(function(event) {
        $(this).animate({
                'margin-left': '400px',
                'opacity': '0'
            },
            300, function() {
                $(this).css('margin-left', '0').animate({
                    "opacity": '1'
                }, 1500);
            }
        );
    });
});