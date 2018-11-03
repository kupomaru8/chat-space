$(document).on('turbolinks:load', function() {

var search_list = $("#user-search-result");

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`;
  search_list.append(html);
}

function appendNoUser(user) {
  var html = `<div class="chat-group-user clearfix">${user}</div>`;
  search_list.append(html);
}

function buildMemberHTML(id,name) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                <input name='group[user_ids][]' type='hidden' value='${id}'>
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${id}">削除</a>
              </div>`;
  return html;
}

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    console.log(input);

    $.ajax({
      type: 'GET',
      url: '/groups/search',
      data: {keyword: input},
      dataType: 'json'
    })


    .done(function(users){
      search_list.empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するUserはいません");
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    });
  });

  //メンバーの追加
  $("#user-search-result").on("click",".user-search-add",function(e){
    e.preventDefault();
    var id = $(this).data('userId');
    var name = $(this).data('userName');
    var insertHTML = buildMemberHTML(id,name);
    $(".chat-group-users").append(insertHTML);
    $(this).parent(".chat-group-user").remove();
  });

  $(".chat-group-users").on("click",".user-search-remove",function(){
    var id = $(this).data('userId');
    $(`#chat-group-user-${id}`).remove();
  })
});
