'use strict';

$(document).ready(function(){

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
          console.log("SEARCH ERROR");
      }
    });

  }

  function search_success(data){
    console.log(data[0]);
  }
});
