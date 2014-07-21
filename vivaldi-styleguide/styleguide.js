jQuery(document).ready(function() {
    $("body").click(function(event) {
        $("#collapsed-nav").css('display', 'block');
        $("#expanded-nav").css('display', 'none');
        $(".styleguide-navigation").removeClass('styleguide-navigation-expanded');
    });
    $("#collapsed-nav").click(function(event) {
        event.stopPropagation();
        $("#collapsed-nav").css('display', 'none');
        $("#expanded-nav").css('display', 'block');
        $(".styleguide-navigation").addClass('styleguide-navigation-expanded');
    });
});