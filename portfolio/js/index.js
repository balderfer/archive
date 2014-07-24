var unicornVisible = false;

$(document).ready(function() {
    $("#unicorn").click(function(event) {
        if (unicornVisible) {
            $("#unicorn-gif").slideUp("fast");
            $(this).html("Designer, Developer,<br/>Entreprenuer");
            unicornVisible = false;
        } else if (!unicornVisible) {
            $("#unicorn-gif").slideDown("fast");
            $(this).html("Basically a Unicorn");
            unicornVisible = true;
        }
    });
});