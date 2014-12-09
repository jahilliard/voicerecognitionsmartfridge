if (annyang) {
  // Let's define a command.
  var showTerm = function(term) {
    $('#product-tit').html("Searching FreshDirect For "+term+"...");
    $('input').hide();
    $('.btn').hide();
    $('#product-pri').hide();
    $.ajax({
          //creates route for pastaCreate
          url:"/getFood?term="+term,
          type:'GET',
          success: function(data){
            console.log(data.title);
            $('#product-tit').html(data.title);
            $('#product-pri').html(data.price);
            $('#img').html('<img src="'+data.img+'"></img>');
            $('input').show();
            $('#img').show();
            $('.btn').show();
            $('#product-pri').show();
          }
        });
  }

  var commands = {
    'hello fridge': function(){$('#product-tit').html('I can hear you!');},
    'buy *term': showTerm
  };


  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening.
  annyang.start();
}