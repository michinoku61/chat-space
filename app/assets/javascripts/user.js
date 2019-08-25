

$(document).on('turbolinks:load', function(){
  $(function(){

    let search_list = $('#user-search-result');
    let add_menber = $('#add-menber')
    
    function appendUser(user){
      let html =
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
      </div>`
      search_list.append(html);
      }

    function appendErrMsgToHTML(msg) {
      let html = `<p class="chat-group-user__name">${msg}</p>`
      search_list.append(html);
      }

    function addmenber(name,id){
      let html =
      `<div class='chat-group-user'>
        <input name='group[user_ids][]' type='hidden' value=${id}>
        <p class='chat-group-user__name'>${name}</p>
        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
      </div>`
      add_menber.append(html);
    }


    $('#user-search-field').on("keyup",function(){
      let input = $('#user-search-field').val();
      
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      

      .done(function(users){
        $('#user-search-result').empty();
          if (users.length !== 0) {
            users.forEach(function(user){
              appendUser(user);
            });
          }
          else {
            appendErrMsgToHTML("一致するユーザーはいません");
        }
      })
      .fail(function() {
        alert('error');
      })
    });
    
    $(document).on("click", ".chat-group-user__btn--add", function(){
      let id= $(this).attr("data-user-id");
      let name = $(this).attr("data-user-name")
      $(this).parent().remove()
      addmenber(name,id)
    });
    $(document).on("click", ".js-remove-btn", function(){
      $(this).parent().remove()
    })
  });
});