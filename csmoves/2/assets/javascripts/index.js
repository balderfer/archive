$(window).load(function() {
    /* Act on the event */
    $(".ellipsis").dotdotdot({
        watch: window
    });
});

$(document).ready(function() {
    var lineGraph1Data = {
        labels: ["2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(163, 121, 44, 0.25)",
                strokeColor: "rgba(163, 121, 44, 1.0)",
                pointColor: "rgba(163, 121, 44, 1.0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(163, 121, 44, 1.0)",
                data: [152, 134, 125, 188, 212, 247, 275, 243, 276, 287]
            },
            {
                label: "My Third dataset",
                fillColor: "rgba(209, 211, 212, 0.25)",
                strokeColor: "rgba(209, 211, 212, 1.0)",
                pointColor: "rgba(209, 211, 212, 1.0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(209, 211, 212, 1.0)",
                data: [522, 474, 461, 438, 472, 551, 688, 831, 901, 1014]
            }
        ]
    };
// 68  89  94  126 159
// 29  51  44  45  38
// 23  13  11  25  16
    var barGraph1Data = {
        labels: ["2009-2010", "2010-2011", "2011-2012", "2012-2013", "2013-2014"],
        datasets: [
            {
                label: "Undergraduate Students",
                fillColor: "rgba(209, 211, 212, 1.0)",
                strokeColor: "rgba(209, 211, 212, 0)",
                highlightFill: "rgba(209, 211, 212, 1.0)",
                highlightStroke: "rgba(209, 211, 212, 1.0)",
                data: [23, 13, 11, 25, 16]
            },
            {
                label: "Undergraduate Students",
                fillColor: "rgba(167, 169, 172, 1)",
                strokeColor: "rgba(167, 169, 172, 0)",
                highlightFill: "rgba(167, 169, 172, 1)",
                highlightStroke: "rgba(167, 169, 172, 1)",
                data: [29, 51, 44, 45, 38]
            },
            {
                label: "Graduate Students",
                fillColor: "rgba(163, 121, 44, 1.0)",
                strokeColor: "rgba(163, 121, 44, 0)",
                highlightFill: "rgba(163, 121, 44, 1.0)",
                highlightStroke: "rgba(163, 121, 44, 1.0)",
                data: [68, 89, 94, 126, 159]
            },
        ]
    };

    var pieGraph1Data = [
        {
            value: 1014,
            color: "#E3AE24",
            highlight: "#F3BE34",
            label: "BS"
        },
        {
            value: 173,
            color: "#A3792C",
            highlight: "#B3893C",
            label: "PHD"
        },
        {
            value: 86,
            color:"#D1D3D4",
            highlight: "#E1E3E4",
            label: "MS"
        }
    ];

    var pieGraph2Data = [
        {
            value: 38,
            color: "#E3AE24",
            highlight: "#F3BE34",
            label: "Computer Graphics and Visualization"
        },
        {
            value: 15,
            color: "#A3792C",
            highlight: "#B3893C",
            label: "Computational Science and Engineering"
        },
        {
            value: 19,
            color:"#D1D3D4",
            highlight: "#E1E3E4",
            label: "Database and Information Systems"
        },
        {
            value: 7,
            color: "#E3AE24",
            highlight: "#F3BE34",
            label: "Foundations of Computer Science"
        },
        {
            value: 33,
            color: "#A3792C",
            highlight: "#B3893C",
            label: "Machine Intelligence"
        },
        {
            value: 5,
            color:"#D1D3D4",
            highlight: "#E1E3E4",
            label: "Programming Languages"
        },
        {
            value: 55,
            color: "#E3AE24",
            highlight: "#F3BE34",
            label: "Security"
        },
        {
            value: 30,
            color: "#A3792C",
            highlight: "#B3893C",
            label: "Systems Programming"
        },
        {
            value: 177,
            color:"#D1D3D4",
            highlight: "#E1E3E4",
            label: "Software Engineering"
        },
    ];

    $('.full-graph').each(function(index, el) {
        var fgWidth = $(this).width();
        var fgHeight = $(this).height();
        $(this).children('canvas').attr({
            width: fgWidth,
            height: fgHeight * 0.8
        });
    });

    var ctx1 = document.getElementById("lineGraph1").getContext("2d");
    var lineGraph1 = new Chart(ctx1).Line(lineGraph1Data);

    var ctx2 = document.getElementById("barGraph1").getContext("2d");
    var barGraph1 = new Chart(ctx2).Bar(barGraph1Data);

    var ctx3 = document.getElementById("pieGraph1").getContext("2d");
    var pieGraph1 = new Chart(ctx3).Doughnut(pieGraph1Data);

    var ctx4 = document.getElementById("pieGraph2").getContext("2d");
    var pieGraph2 = new Chart(ctx4).Pie(pieGraph2Data);
});
