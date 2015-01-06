$(document).ready(function() {
    var path1 = document.querySelector('.path1');
    var length1 = path1.getTotalLength();
    var path2 = document.querySelector('.path2');
    var length2 = path2.getTotalLength();
    var path3 = document.querySelector('.path3');
    var length3 = path3.getTotalLength();

    $(".path1").css('stroke-linecap', 'round');
    $(".path2").css('stroke-linecap', 'round');
    $(".path3").css('stroke-linecap', 'round');

    $('.path1').css('stroke', '#F1C40F');
    $('.path2').css('stroke', '#ECF0F1');
    $('.path3').css('stroke', '#BDC3C7');
    $('.highlight1').css('stroke', 'rgba(255, 255, 255, 0.5)');
    $('.highlight2').css('stroke', 'rgba(255, 255, 255, 0.5)');
    $('.highlight3').css('stroke', 'rgba(255, 255, 255, 0.5)');

    $(".path1").css('stroke-dashoffset', length1 - 100);
    $(".path1").css('stroke-dasharray', length1);
    $(".path2").css('stroke-dashoffset', length2 - 60);
    $(".path2").css('stroke-dasharray', length2);
    $(".path3").css('stroke-dashoffset', length3 - 40);
    $(".path3").css('stroke-dasharray', length3);

    $(".path1").css('stroke-width', (Math.sin(0 / 10) * 5) + 10);
    $(".path2").css('stroke-width', (Math.cos(0 / 10) * 5) + 10);
    $(".path3").css('stroke-width', (Math.sin(0 / 10) * 5) + 10);
    $(".highlight1").css('stroke-width', ((Math.sin(0 / 10) * 5) + 10) * 0.5);
    $(".highlight2").css('stroke-width', ((Math.cos(0 / 10) * 5) + 10) * 0.5);
    $(".highlight3").css('stroke-width', ((Math.sin(0 / 10) * 5) + 10) * 0.5);

    $(".highlight1").attr('transform', 'translate(-' + (((Math.sin(0 / 10) * 5) + 10) * 0.25) + ',0)');
    $(".highlight2").attr('transform', 'translate(-' + (((Math.cos(0 / 10) * 5) + 10) * 0.25) + ',0)');
    $(".highlight3").attr('transform', 'translate(-' + (((Math.sin(0 / 10) * 5) + 10) * 0.25) + ',0)');


    $(window).scroll(function () {
        var percentageComplete = (($(window).scrollTop() / ($("html").height() - $(window).height())) * 99);

        // 7.7%, 38.3%, 70%, 84.3%
        // if (percentageComplete < 7.7) {
        //     $('body').removeClass('gray').removeClass('gold');
        //     $('body').addClass('white');
        //     $('.path1').css('stroke', '#F1C40F');
        //     $('.path2').css('stroke', '#ECF0F1');
        // }
        // else if (percentageComplete < 38.3) {
        //     $('body').removeClass('gold').removeClass('white');
        //     $('body').addClass('gray');
        //     $('.path1').css('stroke', '#F1C40F');
        //     $('.path2').css('stroke', '#FFFFFF');
        // }
        // else if (percentageComplete < 70) {
        //     $('body').removeClass('gray').removeClass('white');
        //     $('body').addClass('gold');
        //     $('.path1').css('stroke', '#ECF0F1');
        //     $('.path2').css('stroke', '#FFFFFF');
        // }
        // else if (percentageComplete < 84.3) {
        //     $('body').removeClass('gold').removeClass('white');
        //     $('body').addClass('gray');
        //     $('.path1').css('stroke', '#F1C40F');
        //     $('.path2').css('stroke', '#FFFFFF');
        // }
        // else  {
        //     $('body').removeClass('gold').removeClass('gray');
        //     $('body').addClass('white');
        //     $('.path1').css('stroke', '#F1C40F');
        //     $('.path2').css('stroke', '#ECF0F1');
        // }

        $(".path1").css('stroke-dashoffset', (length1 * (100 - percentageComplete) / 100));
        $(".path2").css('stroke-dashoffset', (length2 * (100 - percentageComplete) / 100));
        $(".path3").css('stroke-dashoffset', (length2 * (100 - percentageComplete) / 100));
        
        $(".path1").css('stroke-width', (Math.sin(percentageComplete / 10) * 5) + 10);
        $(".path2").css('stroke-width', (Math.cos(percentageComplete / 10) * 5) + 10);
        $(".path3").css('stroke-width', (Math.sin(percentageComplete / 10) * 5) + 10);
        $(".highlight1").css('stroke-width', ((Math.sin(percentageComplete / 10) * 5) + 10) * 0.5);
        $(".highlight2").css('stroke-width', ((Math.cos(percentageComplete / 10) * 5) + 10) * 0.5);
        $(".highlight3").css('stroke-width', ((Math.sin(percentageComplete / 10) * 5) + 10) * 0.5);

        $(".highlight1").attr('transform', 'translate(-' + (((Math.sin(percentageComplete / 10) * 5) + 10) * 0.25) + ',0)');
        $(".highlight2").attr('transform', 'translate(-' + (((Math.cos(percentageComplete / 10) * 5) + 10) * 0.25) + ',0)');
        $(".highlight3").attr('transform', 'translate(-' + (((Math.sin(percentageComplete / 10) * 5) + 10) * 0.25) + ',0)');
    });
});

// function getX(percent) {
//     return percent * $(window).width();
// }
// function getY(percent) {
//     return percent * $(window).height();
// }

// $(document).ready(function() {
//     var bX = 0.1;
//     var bY = 0;
//     var eX = 0.1;
//     var eY = 0.5;

//     var lines = document.getElementById('lines');

//     lines.width = $(window).width();
//     lines.height = $(window).height();

//     var context = lines.getContext('2d');

//     context.beginPath();
//     context.moveTo(getX(bX), getY(bY));
//     context.lineTo(getX(eX), getY(eY));
//     context.lineWidth = 10;

//     // line color
//     context.strokeStyle = 'black';
//     context.stroke();

//     $(window).scroll(function () {
//         var percentageComplete = (($(window).scrollTop()/($("html").height()-$(window).height()))*100); 
//         console.log(percentageComplete);
//         // context.clearRect(0, 0, lines.width, lines.height);

//         bX = (Math.sin(percentageComplete) / 4) + (0.25);
//         eX = (Math.sin(percentageComplete) / 4) + (0.25);

//         context.beginPath();
//         context.moveTo(getX(bX), getY(bY));
//         context.lineTo(getX(eX), getY(eY));
//         context.lineWidth = 10;

//         context.strokeStyle = 'black';
//         context.stroke();
//     });
// });