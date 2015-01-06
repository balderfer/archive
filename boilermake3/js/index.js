$(document).ready(function() {
    
    var dancer = new Dancer();

    // Using an audio object
    var a = new Audio();
    a.src = 'sprawlII.mp3';
    dancer.load(a);

    // Initialize visualizer
    var visualizer = document.getElementById("visualizer");
    var ctx = visualizer.getContext("2d");

    var play = dancer.play();

    var j = 0;

    window.setInterval(function() {
        ctx.clearRect(0,0,512,256);
        if (dancer.isPlaying) {
            var freq = dancer.getFrequency();
            ctx.fillStyle = "#FF0000";
            
            var maxFreq = 0;
            for (var i = 0; i < 32; i++) {
                if (freq[i] > maxFreq) maxFreq = freq[i];
            }
            ctx.fillRect(0,0,100,256*maxFreq);

            var maxFreq = 0;
            for (var i = 32; i < 64; i++) {
                if (freq[i] > maxFreq) maxFreq = freq[i];
            }
            ctx.fillRect(100,0,100,256*maxFreq);
        }
    }, 10);

});
