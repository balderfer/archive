$(function() {
  var item = window.localStorage.getItem('config');
  var uniqueId;
  var config;

  if ( item === null || item.length === 0 ){
    config = {};
  } else {
    config = JSON.parse(item);
    if ( config.hasOwnProperty("unique-id") ){
      uniqueId = config['unique-id'];
      $('#unique-id').val(uniqueId);
    }
  }
  $('#submit').click(function(){
    if (typeof(config) === 'string' ){
      config = {};
    }
    uniqueId = $('#unique-id').val();
    config['unique-id'] = uniqueId;
    pokemon = $('#pokemon').val();
    config['pokemon'] = pokemon;
    var move1 = $('#move1').val();
    config['move1'] = move1;
    var move2 = $('#move2').val();
    config['move2'] = move2;
    var move3 = $('#move3').val();
    config['move3'] = move3;
    var move4 = $('#move4').val();
    config['move4'] = move4;

    var jsconfig = JSON.stringify(config);
    window.localStorage.setItem('config', jsconfig);
    location.href = "pebblejs://close#" + encodeURIComponent( jsconfig );
    console.log(jsconfig);
  });

});
