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
var linebreak = ("-------------------------------------------------------------------------------");

// console.log("LIRI.JS LOADED SUCCESSFULLY!")


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
                var venueName = response.data[i].venue.name;
                var venueCity = response.data[i].venue.city;
                var date = response.data[i].datetime;

                console.log("VENUE NAME: " + venueName);
                console.log("VENUE CITY: " + venueCity);
                console.log("DATE: " + date);
                console.log("****************************");
            }

            var logConcertData = [
                "VENUE NAME: " + venueName,
                "VENUE CITY: " + venueCity,
                "DATE: " + date
            ]
            fs.appendFile("log.txt", logConcertData, function(err) {
                if(err) throw err;
            })
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
            let song = JSON.stringify(response.tracks.items[0].name, null, 2)
            let artist = JSON.stringify(response.tracks.items[0].artists[0].name, null, 2)
            let url = JSON.stringify(response.tracks.items[0].preview_url, null, 2)

            console.log("SONG: " + song);
            console.log("ARTIST: " + artist)
            console.log("URL: " + url);

            var showSpotifyData = [
                "SONG: " + song,
                "ARTIST: " + artist,
                "URL: " + url
            ]

            //log showspotifydata
            fs.appendFile("log.txt", showSpotifyData, function(err) {
                if(err) throw err;
            })
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

            var showMovieData = [
                "Title: " + response.data.Title,
                "Year: " + response.data.Year,
                "Rating: " + response.data.Ratings[0].Value,
                "Rotten Tomatoes: " + response.data.Ratings[1].Value,
                "Country: " + response.data.Country,
                "Language: " + response.data.Language,
                "Plot: " + response.data.Plot,
                "Actors: " + response.data.Actors,
            ]
            
            //Log to text file
            fs.appendFile("log.txt", showMovieData, function(err) {
                if(err) throw err;
            })
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
        // console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        // console.log(dataArr);

        //spotify-this-song, "I Want it That Way", movie-this, "Armageddon", concert-this, "Jay-Z" 
        let random1 = dataArr[1].slice(2, -1);
        let random2 = dataArr[3].slice(2, -1);
        let random3 = dataArr[5].slice(2, -1);
        // console.log(random1); 
        // console.log(random2);
        // console.log(random3);
        // console.log(linebreak);

        //----------------------------------------------------------------------------------------------------



        //ESTABLISH SPOTIFYTHISSONG FUNCTION***********************************
        //I HAD TO DUPLICATE THE FUNCTION ABOVE BECAUSE I WAS NOT ABLE TO CALL OUT TO IT.
        //THE ABOVE SPOTIFY THIS FUNCTION ONLY TAKES THE USERINPUT VARIABLE.  I THOUGHT I WOULD BE ABLE TO USE LET
        //TO CHANGE THE INPUT AND LET ME PASS IT IN BUT IT WOULD NOT LET ME.  
        //SAME GOES FOR THE OTHER FUNCTION. I'M SURE THERE IS A SHORTER WAY OF DOING THIS. 
        function rspotifyThisSong() {
            // console.log("RSPOTIFYTHISSONG LOADED SUCCESSFULLY!")
            spotify
                .search({ type: 'track', query: random1, limit: 20 })
                .then(function (response) {
                    let song = JSON.stringify(response.tracks.items[0].name, null, 2);
                    let artist = JSON.stringify(response.tracks.items[0].artists[0].name, null, 2);
                    let url = JSON.stringify(response.tracks.items[0].preview_url, null, 2);
                    
                    console.log("SONG: " + song);
                    console.log("ARTIST: " + artist);
                    console.log("URL: " + url);
                    console.log(linebreak);

                    var showRSpotifyData = [
                        "SONG: " + song,
                        "ARTIST: " + artist,
                        "URL: " + url
                    ]

                    fs.appendFile("log.txt", showRSpotifyData, function(err) {
                        if(err) throw err;
                    })
                })
                .catch(function (err) {
                    console.log(err);
                });


        }//END OF SPOTIFYTHISSONG FUNCTION*************************************
        rspotifyThisSong();

        //----------------------------------------------------------------------------------------------------

        //ESTABLISH MOVIETHIS FUNCTION*****************************************
        function rmovieThis() {
            // Then run a request with axios to the OMDB API with the movie specified
            axios.get("http://www.omdbapi.com/?t=" + random2 + "&y=&plot=short&apikey=trilogy").then(
                function (response) {
                    // console.log("RMOVIETHIS LOADED SUCCESSFULLY!")


                    console.log("Title: " + response.data.Title);
                    console.log("Year: " + response.data.Year);
                    console.log("Rating: " + response.data.Ratings[0].Value);
                    console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
                    console.log("Country: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Actors: " + response.data.Actors);
                    console.log(linebreak);

                    var showRMovieThis = [
                        "Title: " + response.data.Title,
                        "Year: " + response.data.Year,
                        "Rating: " + response.data.Ratings[0].Value,
                        "Rotten Tomatoes: " + response.data.Ratings[1].Value,
                        "Country: " + response.data.Country,
                        "Language: " + response.data.Language,
                        "Plot: " + response.data.Plot,
                        "Actors: " + response.data.Actors
                    ]

                    fs.appendFile("log.txt", showRMovieThis, function(err) {
                        if(err) throw err;
                    })
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


        } // END OF MOVIETHIS FUNCTION inside fs*******************************
        rmovieThis();

        //----------------------------------------------------------------------------------------------------

        //ESTABLISH CONCERTHIS FUNCTION ***************************************
        function rconcertThis() {
            //Console.log successful load.
            // console.log("RCONCERTTHIS FUNCTION LOADED SUCCESSFULLY!");

            // Then run a request with axios to the OMDB API with the movie specified
            axios.get("https://rest.bandsintown.com/artists/" + random3 + "/events?app_id=codingbootcamp").then(
                function (response) {
                    
                    // console.log(response.data);
                    let venueName = response.data[0].venue.name;
                    let venueCity = response.data[0].venue.city;
                    let date = response.data[0].datetime;

                    for (i = 0; i < response.data.length; i++) {
                        console.log("VENUE NAME: " + venueName);
                        console.log("VENUE CITY: " + venueCity);
                        console.log("DATE: " + date);
                        console.log(linebreak);
                    }

                        var showRConcertThis = [
                            "VENUE NAME: " + venueName,
                            "VENUE CITY: " + venueCity,
                            "DATE: " + date
                        ]

                        fs.appendFile("log.txt", showRConcertThis, function(err) {
                            if(err) throw(err);
                        })
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
        }// END OF CONCERTTHIS FUNCTION****************************************
        rconcertThis();

        
    });//END OF FS.READFILE


}

//END OF FUNCTIONS============================================================================================