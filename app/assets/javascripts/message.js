$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var insertImage = '';
    if (message.image.url) {
      insertImage = `<img src = "${message.image.url}" class= "lower-message__image">`;
    }
    var html =`<div class="chat-box">
                  <div class="chat" data-id="${message.id}">
                    <p class="chat__user">
                      ${message.user_name}
                    </p>
                    <p class="chat__date">
                    ${message.date}
                    </p>
                    <p class="chat__content">
                      ${message.content}
                    </p>
                    ${insertImage}`
    return html;
  }

  $('#new_massage').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-content').append(html)
      $('.textbox').val('')
      $('.imagebox').val('')
      $('.form__submit').attr('disabled',false)
      $('.groups__messages').html(${message.content})
      // $('.chat-content').animate({scrollTop: $('.chat-content')[0].scrollHeight}, 500, 'swing');
    })
    .fail(function(){
      alert('error');
    })
  })

  var interval = setInterval(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {

        var message_id = $('.chat:last').data('id');


      $.ajax({
        type: 'GET',
        url: location.href,
        data: {
          message:{id: message_id}
        },
        dataType: 'json'
      })
      .done(function(data){
        var insertHTML = "";
        data.messages.forEach(function(message){
          insertHTML = buildHTML(message);
        });
        $('.chat-content').append(insertHTML);
      })
      .fail(function(data){
        console.log(message_id);
        // alert("自動更新に失敗しました");
      });
  } else {
    clearInterval(interval);
  }},5000);
});
