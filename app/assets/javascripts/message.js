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
      console.log(data)
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
});

