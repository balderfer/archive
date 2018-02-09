function initializeElements() {
    /* Act on the event */
    if ($(window).width() < 992) {
        $(".panel-lg").css("height", "");
        $(".panel-sm").height(540);
        $(".panel-md").height(540);
    } else {
        var maxHeight = $(".panel-lg").outerHeight();
        if (maxHeight < $(window).height()) {
            maxHeight = $(window).height();
            $(".panel-lg").outerHeight(maxHeight);
        }
        console.log(maxHeight);
        $(".panels").outerHeight(maxHeight);
        var newHeight = $(".panels").outerHeight();
        $(".panel-md").height(newHeight / 2);
        $(".panel-sm").height(newHeight / 4);
    }
}

$(document).ready(function() {
    initializeElements();
    $(window).resize(function(event) {
        /* Act on the event */
        if ($(window).width() < 992) {
            $(".panel-lg").css("height", "");
            $(".panel-sm").height(600);
            $(".panel-md").height(600);
        } else {
            $(".panel-lg").css("height", "");
            var maxHeight = $(".panel-lg").outerHeight();
            if (maxHeight < $(window).height()) {
                maxHeight = $(window).height();
                $(".panel-lg").outerHeight(maxHeight);
            }
            console.log(maxHeight);
            var newHeight = $(".panels").outerHeight(maxHeight);
            $(".panel-md").height(newHeight / 2);
            $(".panel-sm").height(newHeight / 4);
        }
    });
});