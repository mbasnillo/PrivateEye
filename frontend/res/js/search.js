'use strict';

$(document).ready(function(){
  $('#res').hide();
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
        $("#result_name").empty();
        return alertify.notify(err.responseText, 'custom', 2, function(){ });
      }
    });

  }

  function search_success(data){
    var arr = [];
    $('#res').show();
    $("#result_name").empty();
    for(var i=0; i<=data.length-1; i++){
      $("#result_name").append("<p> <b>" + (i+1) + ".</b> " + data[i].post + "</p> <hr />");
    }
  }

  $('#btn_clear').click(clear);

  function clear(){
    $("#result_name").empty();
    $('#res').hide();
  }
});
