require('dotenv').config();
let Spotify = require('node-spotify-api');
let Twitter = require('twitter');
let request = require('request');

let keys = require('./keys.js');
let app = process.argv[2];
let query = process.argv[3];

let spotify = new Spotify(keys.spotify);

console.log(spotify);
// let appService = process.argv[2];
// let query = process.argv[3];

// switch (appService) {
//     case 'my-tweets': myTweets();
//     break;
//     case 'spotify-this-song': spotifyThis(query);
//     break;
//     case 'movie-this': movieThis(query);
//     break;
//     case 'do-what-it-says': doThis();
//     break;
// }

// function spotifyThis(query){
//     if (query === '') {
//         //search ace of base, the sign
//     } else {
//         // query the query term
//     }
// }