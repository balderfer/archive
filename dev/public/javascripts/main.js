function initPages() {
    pages = [];
    
    // Add each page element to Array
    $('.page').each(function(index, el) {
        pages.push(el);
    });

    // Reverse array so it becomes back to front
    pages.reverse();

    var i = 0;

    $(pages).each(function(index, el) {
        // var top = (pages.length - i - 1) * $(window).height() * -1;
        // $(el).css('top', top);
        $(el).css('z-index', i * 10);
        i++;
    });
}

$(document).ready(function() {
});


var previous = 0;
var current = 0;

window.onscroll = function(e) {
    var height = $(window).height();
    current = $(document).scrollTop();
    
    console.log(current % height);
    if (Math.abs(current - previous) == 1) {
        console.log("1 at a time");

    }
    previous = current;
};