require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
const axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var inquirer = require("inquirer");


var whatToDo = process.argv[2];
var userInput = process.argv.slice(3).join(" ");


console.log("LIRI.JS LOADED SUCCESSFULLY!")


//SWITCH STATMENTS*******************
switch (whatToDo) { //
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
        function (response) {
            console.log("SEARCHING FOR: " + userInput);
            // console.log(response.data);
            console.log("****************************")
            for (i = 0; i < response.data.length; i++) {
                console.log("VENUE NAME: " + response.data[i].venue.name);
                console.log("VENUE CITY: " + response.data[i].venue.city);
                console.log("DATE: " + response.data[i].datetime);

                console.log("****************************")
            }

        })
        .catch(function (error) {
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
            console.log("SONG: " + JSON.stringify(response.tracks.items[0].name, null, 2));
            console.log("ARTIST: " + JSON.stringify(response.tracks.items[0].artists[0].name, null, 2))
            console.log("URL: " + JSON.stringify(response.tracks.items[0].preview_url, null, 2));

        })
        .catch(function (err) {
            console.log(err);
        });
}//END OF SPOTIFYTHISSONG FUNCTION****************************



//ESTABLISH MOVIETHIS FUNCTION********************************
function movieThis() {
    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);

        })
        .catch(function (error) {
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
} // END OF MOVIETHIS FUNCTION********************************


//ESTABLISH DOWHATITSAYS FUNCTION****************************
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);

        //spotify-this-song, "I Want it That Way", movie-this, "Armageddon", concert-this, "Jay-Z" 

        let randomInput = dataArr[1].slice(2, -1);
        console.log(randomInput);


        //ESTABLISH SPOTIFYTHISSONG FUNCTION**************************
        function rspotifyThisSong() {
            console.log("SPOTIFY-THIS-SONG LOADED SUCCESSFULLY!")
            spotify
                .search({ type: 'track', query: randomInput, limit: 20 })
                .then(function (response) {
                    console.log("SONG: " + JSON.stringify(response.tracks.items[0].name, null, 2));
                    console.log("ARTIST: " + JSON.stringify(response.tracks.items[0].artists[0].name, null, 2))
                    console.log("URL: " + JSON.stringify(response.tracks.items[0].preview_url, null, 2));

                })
                .catch(function (err) {
                    console.log(err);
                });

            
        }//END OF SPOTIFYTHISSONG FUNCTION*****
        rspotifyThisSong();

    });

}

//END OF FUNCTIONS===========================================