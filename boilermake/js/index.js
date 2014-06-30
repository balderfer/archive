var inputBox = false;

function validateEmail() {
    var email = $("#email input").val();
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    var ext = email.slice((email.length - 4));
    if (atpos < 1 || dotpos < atpos + 2 || ext !== ".edu") {
        return false;
    } else {
        return true;
    }
}

function validatePassword() {
    var re = /^[\w ]+$/;
    if ($("#password input").val().length < 6) {
        $("#password .error").html("Password must be at least 6 characters long.");
        return false;
    } else if (!re.test($("#password input").val())) {
        $("#password .error").html("Password must only contain letters and numbers.");
        return false;
    } else {
        return true;
    }
}

function validatePasswordsMatch() {
    var pass1 = $("#password input").val();
    var pass2 = $("#confirm-password input").val();
    console.log(pass1);
    if (pass1 !== pass2 || pass1 === "" || pass2 === "") {
        return false;
    } else {
        return true;
    }
}

function submitForm() {

}



$(document).ready(function() {


    $("#login").click(function(event) {
        $(this).fadeOut("fast", function() {
            $("#emaillogin").fadeIn("fast", function() {
                $("#emaillogin").focus();
            });
            $("#passwordlogin").fadeIn("fast");
        });
    });

    // EARLYBIRD APPLICATION BUTTON
    $("#register").click(function(event) {
        $('body,html').animate({
            scrollTop: 2000
        }, 800);
        $(this).fadeOut("fast", function() {
            $("#email").fadeIn("fast", function() {
                $("#email input").focus();
            });
            $("#password").fadeIn("fast");
            $("#confirm-password").fadeIn("fast");
            inputBox = true;
        });
    });

    // ENTER KEY FUNCTIONALITY
    $(window).keypress(function(e) {
        if (e.which == 13) {
            if (inputBox) {
                var isEmailValid = validateEmail();
                var isPasswordValid = validatePassword();
                var passwordsMatch = validatePasswordsMatch();
                if (isEmailValid) {
                    $("#email .error").addClass('hidden');
                    if (isPasswordValid) {
                        $("#password .error").addClass('hidden');
                        if (passwordsMatch) {
                            $("#confirm-password .error").addClass('hidden');
                            console.log("success");
                            submitForm();
                        } else {
                            // TODO display "Passwords do not match"
                            $("#confirm-password .error").removeClass('hidden');
                            $("#confirm-password input").focus();
                        }
                    } else {
                        // TODO display "password must include at least 6..."
                        $("#password .error").removeClass('hidden');
                        $("#password input").focus();
                    }
                } else {
                    // TODO display "Invalid email, must be a .edu address"
                    $("#email .error").removeClass('hidden');
                    $("#email input").focus();
                }
            } else {
                $('body,html').animate({
                    scrollTop: 460
                }, 800);
                $("#register").fadeOut("fast", function() {
                    $("#email").fadeIn("fast", function() {
                        $("#email input").focus();
                    });
                    $("#password").fadeIn("fast");
                    $("#confirm-password").fadeIn("fast");
                    inputBox = true;
                });
            }
        }
    });

});