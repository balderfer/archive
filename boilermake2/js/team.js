function sendInvite(email) {
    // TODO Send the invite to the email

}

$(document).ready(function() {
    var hacker2 = $("#hacker2 input").val();
    var hacker3 = $("#hacker3 input").val();
    var hacker4 = $("#hacker4 input").val();

    if (hacker2 !== "") {
        $("#hacker2 input").attr('readonly', "readonly");
        $("#hacker2 .send").css("display", "none");
    }
    if (hacker3 !== "") {
        $("#hacker3 input").attr('readonly', "readonly");
        $("#hacker3 .send").css("display", "none");
    }
    if (hacker4 !== "") {
        $("#hacker4 input").attr('readonly', "readonly");
        $("#hacker4 .send").css("display", "none");
    }
    $("#hacker2 .send").click(function(event) {
        sendInvite($("#hacker2 input").val());
    });
    $("#hacker3 .send").click(function(event) {
        sendInvite($("#hacker2 input").val());
    });
    $("#hacker4 .send").click(function(event) {
        sendInvite($("#hacker2 input").val());
    });
});