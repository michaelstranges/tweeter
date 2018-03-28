//tweetbox-hover.js

$(document).ready(function(){
  console.log("hover function OK");

  // $(".tweet").mouseover(function(){
  //   $(this).css("background-color", "yellow");

  // $(".tweet").mouseleave(function(){
  //   $(this).css("background-color", "white");
  // })
  // })
  $(".tweet").load(function(){
    $(this).css("opacity", "0.75");
  })

  $(".tweet").mouseleave(function(){
    $(this).css("opacity", "0.75");

  $(".tweet").mouseover(function(){
    $(this).css("opacity", "1");

  })
  })


  });