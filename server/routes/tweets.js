"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

  // function timeUpdate(actualTime){
  //   let seconds = actualTime - Date.now();
  //   let postTime = "";
  //   if(seconds < 60000){
  //     postTime = `Posted: ${seconds/1000}seconds ago`;
  //   } else if(seconds >= 60000 && seconds < 3600000){
  //     postTime = `Posted: ${(seconds/1000)/60} minutes ago`;
  //   } else if(seconds >= 3600000 && seconds < 86400000){
  //     postTime = `Posted: ${((seconds/1000)/60)/24} hours ago`
  //   } else {
  //     postTime = `Posted: ${seconds/86400000} days ago`
  //   }

  //   return postTime;

}

