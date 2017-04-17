'use strict';

$(document).ready(function(){
  $(document).keypress(function(event){
      if(event.keyCode == 13){
          $('#btn_search').click();
      }
  });

  $('#btn_search').click(search);

  function search(){
    const search_term = $('#search_bar').val();

    $.ajax({
      url: '/search',
      method: 'POST',
      data: {
        search_term : search_term
      },
      dataType: 'json',
      success: search_success,
      error: function(err){
          return alertify.notify(err.responseText, 'custom', 2, function(){ });
      }
    });

  }

  function search_success(data){
    $("#result_name").empty();
    console.log(data.length);
    for(var i=0; i<=data.length; i++){
      console.log(data[i].score);
      $("#result_name").append("<p> <b>" + (i+1) + ".</b> " + data[i].post + "</p>");
    }
  }

  $('#btn_clear').click(clear);

  function clear(){
    $("#result_name").empty();
  }
});
