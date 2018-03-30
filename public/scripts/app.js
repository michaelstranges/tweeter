/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function(){
  console.log("App.js ONLINE");

  function createTweetElement(tweetData, callback){

    //sends tweetData.created_at to callback function to get time
    let theTime = callback(tweetData.created_at);

    return `

    <article class="tweet">
      <header>
        <img class="tweet-logo" src=${tweetData.user.avatars.small} >
        <h2 id="screen-name">${tweetData.user.name}</h2>
        <p id="user">${tweetData.user.handle}</p>
      </header>
      <body>
        <p id="thebody">${escape(tweetData.content.text)}</p>
      </body>
      <footer>
        <p id="age">${theTime}</p>
        <i class="fas fa-heart"></i>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
      </footer>
    </article>`

  }

function renderTweets(history){

  history.forEach(function(content){
    var $tweet = createTweetElement(content, timeUpdate); //sends timeupdate as a callback
    $('.tweetsection').prepend($tweet);
  })
};

  $(function(){
    var $button = $("#submit-button");
    $button.on("click", function(event){
      event.preventDefault();
      console.log("Clickity Click")
      console.log($("#txtarea").val()) //exact info entered

      if($("#txtarea").val().length === 0){
        alert("Your Tweet is empty! No one is ever thinking about 'nothing'")
      } else if($("#txtarea").val().length > 139){
        alert("Your thoughts are too big for a tweet!")
      } else {
        $.ajax({
          type: "POST",
          url: "/tweets",
          data: $("#txtarea").serialize(),
          success: function(newTweets){
            loadTweets()
          }
        })
      }
    })
  })

function loadTweets(){
  $.ajax({
    url: "http://localhost:8080/tweets",
    type: "GET",
    success: function(serverdata){
      renderTweets(serverdata);
    }
  })
}

loadTweets()

//Toggles the "Compose Tweet" box to slidse in/out and focus on text box

$(".compose").click(function(){
  $(".new-tweet").slideToggle();
  $("textarea").focus();
})

function escape(string){
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(string));
  return div.innerHTML;
}

//This function converts from unix time to sec/mins/hours/day
//Function is used as a callback function in createTweetElement
  function timeUpdate(postTime){
    let seconds = Date.now() - postTime;
    let properTime = "";

    if(seconds < 60000){
      properTime = `Posted: ${Math.round(seconds/1000)} second(s) ago`;
    } else if(seconds >= 60000 && seconds < 3600000){
      properTime = `Posted: ${Math.round((seconds/1000)/60)} minute(s) ago`;
    } else if(seconds >= 3600000 && seconds < 86400000){
      properTime = `Posted: ${Math.round(((seconds/1000)/60)/24)} hour(s) ago`
    } else {
      properTime = `Posted: ${Math.round(seconds/86400000)} day(s) ago`
    }
    return properTime;
  }



});