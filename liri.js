require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
const axios = require("axios");
var moment = require("moment");
var fs = require("fs");


var whatToDo = process.argv[2];
var userInput = process.argv[3];

console.log("LIRI.JS LOADED SUCCESSFULLY!")


//SWITCH STATMENTS*******************
switch (whatToDo) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}  //END OF SWITCH STATEMENTS***************************




//============================================================
//FUNCTIONS


//THIS FUNCTION IS NOT COMPLETE/WAITING ON RESPONSE FROM VENDOR
//ESTABLISH CONCERTHIS FUNCTION ******************************
function concertThis() {
    //Console.log successful load.
    console.log("CONCERT.THIS FUNCTION LOADED SUCCESSFULLY!");

// Then run a request with axios to the OMDB API with the movie specified
axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(
  function(response) {
    console.log("SEARCHING FOR: " + userInput);
    console.log(response);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  }); 
}// END OF CONCERTTHIS FUNCTION******************************



//ESTABLISH SPOTIFYTHISSONG FUNCTION**************************
function spotifyThisSong() {
    console.log("SPOTIFY-THIS-SONG LOADED SUCCESSFULLY!")
    spotify
        .search({ type: 'track', query: userInput, limit: 20 })
        .then(function (response) {
            console.log(JSON.stringify(response.tracks.items[0].name, null, 2));
        })
        .catch(function (err) {
            console.log(err);
        });
}//END OF SPOTIFYTHISSONG FUNCTION****************************



//ESTABLISH MOVIETHIS FUNCTION********************************
function movieThis() {

} // END OF MOVIETHIS FUNCTION********************************


//ESTABLISH DOWHATITSAYS FUNCTION****************************
function doWhatItSays() {

}

//END OF FUNCTIONS===========================================