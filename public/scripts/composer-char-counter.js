//composer-char-counter.js

console.log("char counter OK")

$(document).ready(function(){
  console.log("ready function OK");

  $("textarea").keydown(function(event){
    var charsLeft = 140 - (this.value.length);
    $(this).siblings(".counter").text(charsLeft);

    if(charsLeft < 0){
      $(this).siblings(".counter").css("color", "red")
    } else {
      $(this).siblings(".counter").css("color", "#244751")
    }
  })
});