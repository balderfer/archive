function toggleSignIn() {
    $("#signIn").click(function(event) {
        $(this).fadeOut(200, function() {
            $(".nav-signin").fadeIn(200, function() {
                $("#signin-email").focus();
            });
        });
        event.stopPropagation();
    });
    $("body").click(function(event) {
        $(".nav-signin").fadeOut(200, function() {
            $("#signIn").fadeIn(200, function() {});
        });
    });
    $(".nav-signin").click(function(event) {
        event.stopPropagation();
    });
}

function titleAnimation() {
    $(".hero h1").textillate({
        loop: false,
        minDisplayTime: 0,
        initialDelay: 0,
        in : {
            effect: 'bounce',
            callback: function() {
                setTimeout(function() {
                    $(".hero h1").textillate('in');
                }, 5000);
            }
        }
    });
}

jQuery(document).ready(function($) {
    toggleSignIn();
    titleAnimation();
});