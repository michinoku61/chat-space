$(document).on('turbolinks:load', function(){
  $(function(){
    function buildHTML(message){
      let img = message.image.url ? message.image.url :"";{
        let html = 
          `<div class="contents__right__center__upper_box" data-message-id=${message.id}>
            <span class="name">
              ${message.user_name}
            </span>
            <span class="date">
              ${message.date}
            </span>
            <div class="contents__right__center__down_box">
              <p class="message">
                ${message.content}
                </p>
              <img src=${img} >
            </div>
          </div>`
        return html;
      }
    };



  $('.js-form').on('submit', function(e){
      e.preventDefault();
      let formData = new FormData(this);
      let url = $(this).attr('acton')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        let html = buildHTML(data);
        $('.contents__right__center').append(html);
        $('.contents__right__center').animate({scrollTop: $('.contents__right__center')[0].scrollHeight}, 'fast');   
        $('form')[0].reset();
      })
      .fail(function(){
        alert('error');
      });
      return false;
    });

    let group_id = $('.contents__right__center').data('group-id');

    let reloadMessages = function(){

      if (document.URL.match(`/groups/${group_id}/messages`)){
        Last_message_id = $('.contents__right__center__upper_box:last').data('message-id')

        $.ajax({
          url: `/groups/${group_id}/api/messages`,
          type: 'GET',
          dataType: 'json',
          data: {id: Last_message_id}
        })
        .done(function(messages){
          if (messages.length !== 0) {
            messages.forEach(function(message){
              let html = buildHTML(message);
              $('.contents__right__center').append(html)
              $('.contents__right__center').animate({scrollTop: $('.contents__right__center')[0].scrollHeight}, 'fast');
            });
          }
        })
        .fail(function(){
          console.log('失敗')
        });
      }
    }
    setInterval(reloadMessages, 5000);
  });
});
