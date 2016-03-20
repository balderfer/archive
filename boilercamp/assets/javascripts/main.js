$(".data-el").each(function(index, el) {
  var data = $(el).data();
  for (var time in data) {
    $(el).removeAttr('data-'+time);
    $(el).attr('data-'+(time*2), data[time]);
  }
});