// Code to read and set any environment variables with the dotenv package

require("dotenv").config();

// Import files needed to run functions

const fs = require("fs");
const keys = require("./keys.js");
const axios = require("axios");
const inquirer = require("inquirer");
const Spotify = require('node-spotify-api');

// Moment js

const moment = require('moment');
moment().format();

// Spotify API keys

const spotify = new Spotify(keys.spotify);

// Used to pass user command inputs

const userChoice = process.argv[2];
const inputData = process.argv[3];

// Initial prompts

// function liriInput() {
//     inquirer.prompt([{
//         type: "list",
//         message: "What would you like to do?",
//         choices: ["Concert this", "Spotify this song", "Movie this", "Do what it says"],
//         name: "userCommand",
//     },
//     {
//         type: "confirm",
//         message: "Are you sure?",
//         name: "confirm",
//         default: true
//     }
//     ]).then(function (inquirerResponse) {
//         if (inquirerResponse.confirm) {
//             switch (inquirerResponse.userCommand) {
//                 case "Concert this":
//                     getConcert();
//                     break;
//                 case "Spotify this song":
//                     getSong();
//                     break;
//                 case "Movie this":
//                     getMovie();
//                     break;
//                 case "Do what it says":
//                     doIt();
//                     break;
//             }
//         }
//     })
// }

// Initial LIRI inputs

consoleInput(userChoice, inputData);

// Function to switch between users initial choice

function consoleInput(userChoice, inputData) {
    switch (userChoice) {
        case 'concert-this':
            getConcert(inputData);
            break;
        case 'spotify-this-song':
            getSong(inputData);
            break;
        case 'movie-this':
            getMovie(inputData);
            break;
        case 'do-what-it-says':
            doIt();
            break;
        default:
            console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    };
};

// Function used for the "concert-this" command

function getConcert(inputData) {

    const queryUrl = "https://rest.bandsintown.com/artists/" + inputData + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function (response) {
        const concerts = response.data;

        // const concertDt = concerts[0].datetime;
        const momentDt = moment().format('L');

        for (var i = 0; i < concerts.length && i < 10; i++) {
            console.log("-----Concert Information-----");

            // This will append in log.txt file

            fs.appendFileSync("log.txt", "-----Concert Information-----\n");
            console.log(i);
            fs.appendFileSync("log.txt", i + "\n");
            console.log("Name of the Venue: " + concerts[i].venue.name);
            fs.appendFileSync("log.txt", "Name of the Venue: " + concerts[i].venue.name + "\n");
            console.log("Venue Location: " + concerts[i].venue.city);
            fs.appendFileSync("log.txt", "Venue Location: " + concerts[i].venue.city + "\n");
            console.log("Date of the Event: " + concerts[i].datetime);
            fs.appendFileSync("log.txt", "Date of the Event: " + concerts[i].datetime + "\n");
            console.log("--------------------");
            fs.appendFileSync("log.txt", "--------------------" + "\n");
        }

    })
        .catch(function (error) {
            if (error.response) {

                // The request was made and the server responded with a status code

                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {

                // The request was made but no response was received

                console.log(error.request);
            } else {

                // Something happened in setting up the request that triggered an error

                console.log("Error", error.message);
            }
            console.log(error.config);
        });

    // liriInput();
};

// Function used for the "spotify-this-song" command

function getSong(inputData) {

    // Default Song

    if (inputData === undefined) {
        inputData = "The Sign";
    }
    spotify.search(
        {
            type: "track",
            query: inputData
        },
        function (error, data) {
            if (error) {
                console.log("Error occurred: " + error);
                return;
            }
            const songs = data.tracks.items;

            for (var i = 0; i < songs.length && i < 10; i++) {
                console.log("-----Song Information-----");
                fs.appendFileSync("log.txt", "-----Song Information-----\n");
                console.log(i);
                fs.appendFileSync("log.txt", i + "\n");
                console.log("Song name: " + songs[i].name);
                fs.appendFileSync("log.txt", "song name: " + songs[i].name + "\n");
                console.log("Preview song: " + songs[i].preview_url);
                fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url + "\n");
                console.log("Album: " + songs[i].album.name);
                fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                console.log("Artist(s): " + songs[i].artists[0].name);
                fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                console.log("--------------------");
                fs.appendFileSync("log.txt", "--------------------\n");
            };
        }
    );

    // liriInput();

};

// Function used for the "movie-this" command

function getMovie(inputData) {

    // Default Movie

    if (inputData === undefined) {
        inputData = "Mr. Nobody"
        console.log("--------------------");
        fs.appendFileSync("log.txt", "--------------------\n");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "\n");
        console.log("It's on Netflix!");
        fs.appendFileSync("log.txt", "It's on Netflix!\n");
    }
    const queryUrl = "http://www.omdbapi.com/?t=" + inputData + "&y=&plot=short&apikey=b3c0b435";

    axios.get(queryUrl).then(function (response) {
        const movies = response.data;
        console.log("-----Movie Information-----");
        fs.appendFileSync("log.txt", "-----Movie Information-----\n");
        console.log("Title: " + movies.Title);
        fs.appendFileSync("log.txt", "Title: " + movies.Title + "\n");
        console.log("Release Year: " + movies.Year);
        fs.appendFileSync("log.txt", "Release Year: " + movies.Year + "\n");
        console.log("IMDB Rating: " + movies.imdbRating);
        fs.appendFileSync("log.txt", "IMDB Rating: " + movies.imdbRating + "\n");
        console.log("Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies));
        fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies) + "\n");
        console.log("Country of Production: " + movies.Country);
        fs.appendFileSync("log.txt", "Country of Production: " + movies.Country + "\n");
        console.log("Language: " + movies.Language);
        fs.appendFileSync("log.txt", "Language: " + movies.Language + "\n");
        console.log("Plot: " + movies.Plot);
        fs.appendFileSync("log.txt", "Plot: " + movies.Plot + "\n");
        console.log("Actors: " + movies.Actors);
        fs.appendFileSync("log.txt", "Actors: " + movies.Actors + "\n");
        console.log("--------------------");
        fs.appendFileSync("log.txt", "--------------------\n");
    })
        .catch(function (error) {
            if (error.response) {

                // The request was made and the server responded with a status code

                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {

                // The request was made but no response was received

                console.log(error.request);
            } else {

                // Something happened in setting up the request that triggered an error

                console.log("Error", error.message);
            }
            console.log(error.config);
        });

    // liriInput();

};

// Function to get a Rotten Tomatoes value instead of undefined (due to tomatoes on meter)

function getRottenTomatoesRatingObject(data) {
    return data.Ratings.find(function (item) {
        return item.Source === "Rotten Tomatoes";
    });
};

function getRottenTomatoesRatingValue(data) {
    return getRottenTomatoesRatingObject(data).Value;
};

// Function for the "do-what-it-says" command

function doIt() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
            return console.log("Error occurred: " + error);
        }
        const dataArr = data.split(',');
        for (var i = 0; i < dataArr.length && i < 10; i++) {
            console.log(dataArr[i]);
        }
    });

    // liriInput();

};

// liriInput();