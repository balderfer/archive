$(window).load(function() {
    /* Act on the event */
    $(".ellipsis").dotdotdot({
        watch: window
    });
});

$(document).ready(function() {
    var lineGraph1Data = {
        labels: ["2014", "2015", "2016", "2017"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(26, 188, 156, 0.1)",
                strokeColor: "rgba(26, 188, 156, 1.0)",
                pointColor: "rgba(26, 188, 156, 1.0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(26, 188, 156, 1.0)",
                data: [15, 20, 32, 54]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(52, 152, 219, 0.1)",
                strokeColor: "rgba(52, 152, 219, 1.0)",
                pointColor: "rgba(52, 152, 219, 1.0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(52, 152, 219, 1.0)",
                data: [2, 8, 5, 3]
            },
            {
                label: "My Third dataset",
                fillColor: "rgba(155, 89, 182, 0.1)",
                strokeColor: "rgba(155, 89, 182, 1.0)",
                pointColor: "rgba(155, 89, 182, 1.0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(155, 89, 182, 1.0)",
                data: [5, 24, 60, 78]
            }
        ]
    };

    var barGraph1Data = {
        labels: ["2014", "2015", "2016", "2017"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(155, 89, 182, 0.5)",
                strokeColor: "rgba(155, 89, 182, 0)",
                highlightFill: "rgba(155, 89, 182, 0.75)",
                highlightStroke: "rgba(155, 89, 182, 1)",
                data: [25, 30, 35, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(241, 196, 15, 0.5)",
                strokeColor: "rgba(241, 196, 15, 0)",
                highlightFill: "rgba(241, 196, 15, 0.75)",
                highlightStroke: "rgba(241, 196, 15, 1)",
                data: [10, 15, 40, 90]
            }
        ]
    };

    var fgWidth = $(".full-graph").width();
    var fgHeight = $(".full-graph").height();
    $(".full-graph").children('canvas').attr({
        width: fgWidth,
        height: fgHeight
    });

    var ctx1 = document.getElementById("lineGraph1").getContext("2d");
    var lineGraph1 = new Chart(ctx1).Line(lineGraph1Data);

    var ctx2 = document.getElementById("barGraph1").getContext("2d");
    var barGraph1 = new Chart(ctx2).Bar(barGraph1Data);
});
