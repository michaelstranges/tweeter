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

      if($("#txtarea").val().length === 0){
        alert("Your Tweet is empty! No one is ever thinking about 'nothing'")
      }else if($("#txtarea").val().length > 139){
        alert("Your thoughts are too big for a tweet!")
      }else {
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
    let mSeconds = Date.now() - postTime;
    let properTime = "";
    let seconds = mSeconds/1000;

    console.log(seconds)

    if(seconds <= 1){
      properTime = "Posted just now";
    } else if(seconds > 1 && seconds < 60){
      properTime = `Posted: ${Math.round(seconds)} seconds ago`;
    } else if(seconds >= 60 && seconds < 120){
      properTime = `Posted: ${Math.round((seconds)/60)} minute ago`;
    } else if(seconds >= 120 && seconds < 3600){
      properTime = `Posted: ${Math.round((seconds)/60)} minutes ago`;
    } else if(seconds >= 3600 && seconds < 7200){
      properTime = `Posted: ${Math.round(((seconds)/60)/60)} hour ago`;
    } else if(seconds >= 7200 && seconds < 86400){
      properTime = `Posted: ${Math.round(((seconds)/60)/60)} hours ago`;
    } else if(seconds >= 86400 && seconds < 172800){
      properTime = `Posted: ${Math.round(seconds/86400)} day ago`;
    } else if(seconds >= 172800 && seconds < 31536000){
      properTime = `Posted: ${Math.round(seconds/86400)} days ago`;
    } else {
      properTime = `Posted: ${Math.round((seconds/86400)/365)} year(s) ago`;
    }
    return properTime;
  }



});