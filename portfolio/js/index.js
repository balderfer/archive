/*jshint multistr: true */

var index = 0;


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var projects = [
    {
        size: 2,
        html:
           "<div class='col item-group blue span_2_of_8 dropBubble'> \
                <div class='tooltip tblue' onclick='flyOut(this, \"./work.html#bowlbouncer\")'> \
                    <p> \
                        BOWL BOUNCER \
                        <i class='fa fa-chevron-circle-right'></i> \
                    </p> \
                </div> \
                <div class='col mobile-item blue'> \
                    <p>wat wat wat</p> \
                </div> \
                <div class='col item tint tblue'></div> \
                <div class='col item tint tblue'></div> \
            </div>"
    },
    {
        size: 2,
        html:
           "<div class='col item-group blue span_2_of_8 dropBubble'> \
                <div class='tooltip tblue' onclick='flyOut(this, \"./work.html#palettetown\")'> \
                    <p> \
                        PALETTE TOWN \
                        <i class='fa fa-chevron-circle-right'></i> \
                    </p> \
                </div> \
                <div class='col mobile-item blue'> \
                    <p>wat wat wat</p> \
                </div> \
                <div class='col item blue tint tblue'> \
                    <img src='./images/palettetown1.png'> \
                </div> \
                <div class='col item blue tint tblue'> \
                    <img src='./images/palettetown2.png'> \
                </div> \
            </div>"
    },
    {
        size: 3,
        html:
           "<div class='col item-group teal span_3_of_8 dropBubble'> \
                <div class='tooltip tteal' onclick='flyOut(this, \"./work.html#unicorns\")'> \
                    <p> \
                        UNICORNS \
                        <i class='fa fa-chevron-circle-right'></i> \
                    </p> \
                </div> \
                <div class='col mobile-item teal'> \
                    <p>wat wat wat</p> \
                </div> \
                <div class='col item teal tint tteal'> \
                    <img src='./images/unicorn.gif'> \
                </div> \
                <div class='col item teal tint tteal'> \
                    <img src='./images/unicorn.gif'> \
                </div> \
                <div class='col item teal tint tteal'> \
                    <img src='./images/unicorn.gif'> \
                </div> \
            </div>"
    },
    {
        size: 3,
        html:
           "<div class='col item-group yellow span_3_of_8 dropBubble'> \
                <div class='tooltip tyellow' onclick='flyOut(this, \"./work.html#shotgun\")'> \
                    <p> \
                        SHOTGUN \
                        <i class='fa fa-chevron-circle-right'></i> \
                    </p> \
                </div> \
                <div class='col item yellow tint tyellow'> \
                    <img src='./images/shotgun1.png'> \
                </div> \
                <div class='col item yellow tint tyellow'> \
                    <img src='./images/shotgun2.png'> \
                </div> \
                <div class='col item yellow tint tyellow'> \
                    <img src='./images/shotgun3.png'> \
                </div> \
            </div>"
    },
    {
        size: 4,
        html:
           "<div class='col item-group yellow span_4_of_8 dropBubble'> \
                <div class='tooltip tyellow'> \
                    <p> \
                        TODO: FILL \
                        <i class='fa fa-chevron-circle-right'></i> \
                    </p> \
                </div> \
                <div class='col mobile-item yellow'> \
                    <p>wat wat wat</p> \
                </div> \
                <div class='col item tint tyellow'></div> \
                <div class='col item tint tyellow'></div> \
                <div class='col item tint tyellow'></div> \
                <div class='col item tint tyellow'></div> \
            </div>"
    },
    {
        size: 4,
        html:
           "<div class='col item-group red span_4_of_8 dropBubble'> \
                <div class='tooltip tred' onclick='flyOut(this, \"./work.html#zcombinator\")'> \
                    <p> \
                        Z COMBINATOR \
                        <i class='fa fa-chevron-circle-right'></i> \
                    </p> \
                </div> \
                <div class='col mobile-item red'> \
                    <p>wat wat wat</p> \
                </div> \
                <div class='col item tint tred'> \
                    <img src='./images/zc1.png'> \
                </div> \
                <div class='col item tint tred'> \
                    <img src='./images/zc2.png'> \
                </div> \
                <div class='col item tint tred'> \
                    <img src='./images/zc3.png'> \
                </div> \
                <div class='col item tint tred'> \
                    <img src='./images/zc4.png'> \
                </div> \
            </div>"
    },
    {
        size: 6,
        html:
           "<div class='col item-group green span_6_of_8 dropBubble'> \
                <div class='tooltip tgreen' onclick='flyOut(this, \"./work.html#vivaldi\")'> \
                    <p> \
                        VIVALDI \
                        <i class='fa fa-chevron-circle-right'></i> \
                    </p> \
                </div> \
                <div class='col mobile-item green'> \
                    <p>wat wat wat</p> \
                </div> \
                <div class='col item tint tgreen'> \
                    <img src='./images/vivaldi1.png'> \
                </div> \
                <div class='col item tint tgreen'> \
                    <img src='./images/vivaldi2.png'> \
                </div> \
                <div class='col item tint tgreen'> \
                    <img src='./images/vivaldi3.png'> \
                </div> \
                <div class='col item tint tgreen'> \
                    <img src='./images/vivaldi4.png'> \
                </div> \
                <div class='col item tint tgreen'> \
                    <img src='./images/vivaldi5.png'> \
                </div> \
                <div class='col item tint tgreen'> \
                    <img src='./images/vivaldi6.png'> \
                </div> \
            </div>"
    }
];

var projectHTML = 
   "<div class='section group'> \
   <div id='baseBubble' class='col item red span_1_of_8 dropBubble'> \
        <svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 120 120' enable-background='new 0 0 120 120' xml:space='preserve'> \
            <path fill='#FFFFFF' d='M60.1,38.2c-7,0-13.5,2.4-18.6,6.4c-0.7,0.5-1.6,0.1-1.6-0.8l0-22.7c0-1.7-1.4-3-3-3h-4c-1.7,0-3,1.4-3,3l0,46.7c0,16.8,13.4,30.9,30.2,30.9c7,0,13.5-2.4,18.6-6.4c0.7-0.5,1.6-0.1,1.6,0.8v2.5c0,1.7,1.4,3,3,3h4c1.7,0,3-1.4,3-3V69.1C90.3,52.3,76.9,38.2,60.1,38.2z M60,88.6c-11.1,0-20.2-9-20.2-20.2s9-20.2,20.2-20.2s20.2,9,20.2,20.2S71.1,88.6,60,88.6z'/> \
        </svg> \
    </div>";
var bubbleSum = 0;
bubbleCount = 1;
var bubbleLeftInRow = 7;
projects.forEach(function(project) {
    bubbleSum += project.size;
});
shuffle(projects);

count = 0;
var found;

while (bubbleSum > 0 && count < 20) {
    while (bubbleLeftInRow > 0) {
        found = false;
        for (var i = 0; i < projects.length; i++) {
            if (projects[i].size <= bubbleLeftInRow) {
                projectHTML += projects[i].html;
                bubbleSum -= projects[i].size;
                bubbleLeftInRow -= projects[i].size;
                found = true;
                projects.splice(i, 1);
            }
        }
        if (!found) {
            bubbleLeftInRow = 0;
        }
    }
    bubbleLeftInRow = 8;
    projectHTML +=
       "</div> \
        <div class='section group'>";
    count++;
}

projectHTML += "</div>";

function resizeBubbles() {
    var bubbleWidth = $('#baseBubble').width();
    var bubbleMargin = $('#baseBubble + .col').css('margin-left');
    bubbleMargin = Number(bubbleMargin.substring(0, bubbleMargin.length - 2));
    $('.item, .item-group, .mobile-item, .menu-toggle, .menu-toggle .button').height(bubbleWidth);
    $('.item-group .item, .mobile-item, .menu-toggle, .menu-toggle .button').width(bubbleWidth);
    $('.item-group .item').css('margin-left', bubbleMargin);
    $('.item-group').each(function(index, el) {
        $(el).children('.item:first').css('margin-left', '0');
        $(el).children('.item:last').css({
            'float': 'right',
            'margin-left': '0'
        });
    });
    $('.section.group').css('margin-bottom', bubbleMargin);
        
}

function repositionContainer() {
    var cHeight = $('.container').height();
    var wHeight = $(window).height();
    $('.container').css('margin-top', ((wHeight - cHeight) / 2) + 'px');
}

function flyOut(self, target) {
    console.log(self);
    // $(self).removeClass('fadeInLeftBig');
    $(self).addClass('fadeOutRightBig');
    window.setTimeout(function() {
        $('body').animate({opacity: 0}, 250, function() {
            window.location.href = target;
        });
    }, 100);
}

function animateDropBubbles(array) {
    $(array[index]).addClass('animated bounceInDown');
    index++;
    if (array.length > index) {
        window.setTimeout(function() {
            animateDropBubbles(array);
        }, 100);
    }
    else {

    }
}

$(document).ready(function() {
    document.getElementById('projects').innerHTML += projectHTML;

    var dropBubbleArray = [];
    $('.dropBubble').each(function(index, el) {
        dropBubbleArray.push(el);
    });
    shuffle(dropBubbleArray);

    console.log(dropBubbleArray);

    resizeBubbles();
    repositionContainer();
    $(window).resize(function(event) {
        resizeBubbles();
        repositionContainer();
    });


    if ($(window).width() > 768) {
        $('.item-group').hover(function() {
            $(this).children('.item').addClass('animated pulse');
            $(this).children('.tooltip').addClass('animated fadeInLeftBig');
        }, function() {
            $(this).children('.item').removeClass('animated pulse');
            $(this).children('.tooltip').removeClass('fadeInLeftBig');
        });
    }

    animateDropBubbles(dropBubbleArray);

});
