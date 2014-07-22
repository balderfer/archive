var page = 1;

jQuery(document).ready(function($) {
    $("#forward").click(function(event) {
        if (page == 1) {
            $("#page1").fadeOut('fast', function() {
                $("#page2").fadeIn('fast');
            });
            page++;
        } else if (page == 2) {
            $("#page2").fadeOut('fast', function() {
                $("#page3").fadeIn('fast');
            });
            page++;
        } else if (page == 3) {
            $("#page3").fadeOut('fast', function() {
                $("#page4").fadeIn('fast');
            });
            page++;
        } else if (page == 4) {
            $("#page4").fadeOut('fast', function() {
                $("#page5").fadeIn('fast');
            });
            page++;
        }
    });
    $("#backward").click(function(event) {
        if (page == 2) {
            $("#page2").fadeOut('fast', function() {
                $("#page1").fadeIn('fast');
            });
            page--;
        } else if (page == 3) {
            $("#page3").fadeOut('fast', function() {
                $("#page2").fadeIn('fast');
            });
            page--;
        } else if (page == 4) {
            $("#page4").fadeOut('fast', function() {
                $("#page4").fadeIn('fast');
            });
            page--;
        } else if (page == 5) {
            $("#page4").fadeOut('fast', function() {
                $("#page4").fadeIn('fast');
            });
            page--;
        }
    });
});