$(function(){
  function buildHTML(message){
    var insertImage = '';
    if (message.image.url) {
      insertImage = `<img src = "${message.image.url}" class= "lower-message__image">`;
    }
    var html =`<div class="chat-box">
                  <div class="chat">
                    <p class="chat__user">
                      ${message.user_name}
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
      $('.chat-content').prepend(html)
      $('.textbox').val('')
      $('.imagebox').val('')
      $('.form__submit').attr('disabled',false)
      $('.chat-content').animate({scrollTop: 0}, 500, 'swing');
    })
    .fail(function(){
      alert('error');
    })
  })
});
