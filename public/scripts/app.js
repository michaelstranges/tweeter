/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }


  function createTweetElement(tweetData){

    console.log("test 123");

    return `<article class="tweet">
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

var $tweet = createTweetElement(tweetData);

console.log($tweet);

$('#tweets-container').append($tweet);