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
                fillColor: "rgba(163, 121, 44, 0.25)",
                strokeColor: "rgba(163, 121, 44, 1.0)",
                pointColor: "rgba(163, 121, 44, 1.0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(163, 121, 44, 1.0)",
                data: [15, 20, 32, 54]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(227, 174, 36, 0.25)",
                strokeColor: "rgba(227, 174, 36, 1.0)",
                pointColor: "rgba(227, 174, 36, 1.0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(227, 174, 36, 1.0)",
                data: [2, 8, 5, 3]
            },
            {
                label: "My Third dataset",
                fillColor: "rgba(209, 211, 212, 0.25)",
                strokeColor: "rgba(209, 211, 212, 1.0)",
                pointColor: "rgba(209, 211, 212, 1.0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(209, 211, 212, 1.0)",
                data: [5, 24, 60, 78]
            }
        ]
    };

    var barGraph1Data = {
        labels: ["2014", "2015", "2016", "2017"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(163, 121, 44, 1.0)",
                strokeColor: "rgba(163, 121, 44, 0)",
                highlightFill: "rgba(163, 121, 44, 1.0)",
                highlightStroke: "rgba(163, 121, 44, 1.0)",
                data: [25, 30, 35, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(209, 211, 212, 1.0)",
                strokeColor: "rgba(209, 211, 212, 0)",
                highlightFill: "rgba(209, 211, 212, 1.0)",
                highlightStroke: "rgba(209, 211, 212, 1.0)",
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
