require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
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



//ESTABLISH CONCERTHIS FUNCTION ******************************
function concertThis() {

} // END OF CONCERTTHIS FUNCTION******************************


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

function concertThis() {

}

function movieThis() {

}

function doWhatItSays() {

}

//END OF FUNCTIONS******************