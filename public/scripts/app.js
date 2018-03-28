/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function(){
  console.log("App.js ONLINE");

  function createTweetElement(tweetData){

    console.log("test 123");

    return `

    <article class="tweet">
      <header>
        <img class="tweet-logo" src=${tweetData.user.avatars.small} >
        <h2 id="screen-name">${tweetData.user.name}</h2>
        <p id="user">${tweetData.user.handle}</p>
      </header>
      <body>
        <p id="thebody">${tweetData.content.text}</p>
      </body>
      <footer>
        <p id="age">${tweetData.created_at}</p>
      </footer>
    </article>`

  }

function renderTweets(history){

  history.forEach(function(content){
    var $tweet = createTweetElement(content);
    $('.tweetsection').prepend($tweet);
  })
};

//renderTweets(data);


  $(function(){
    var $button = $("#submit-button");
    $button.on("click", function(event){
      event.preventDefault();
      console.log("Clickity Click")
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
      console.log(serverdata);
      renderTweets(serverdata);
    }
  })
}

loadTweets()

});