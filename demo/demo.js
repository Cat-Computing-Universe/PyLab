$(".button_reset").click(function() {
    $( "#output" ).empty();
  });

$('#output').on('DOMSubtreeModified', function(){
    $(this).children().filter(function (_, elem) { 
        return $(elem).text() == "\n"; 
      }).remove();
});