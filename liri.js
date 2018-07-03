require('dotenv').config();
let Spotify = require('node-spotify-api');
let Twitter = require('twitter');
let request = require('request');
let keys = require('./keys.js');

let spotify = new Spotify(keys.spotify);
let twitter = new Twitter(keys.twitter);

let appService = process.argv[2];
let query = process.argv[3];

switch (appService) {
    case 'my-tweets': myTweets();
    break;
    case 'spotify-this-song': spotifyThis(query);
    break;
//     case 'movie-this': movieThis(query);
//     break;
//     case 'do-what-it-says': doThis();
//     break;
    default: return console.log('try again with different input');
}

function myTweets(){
    let params = {screen_name: 'PushiePants'};
    twitter.get('statuses/user_timeline', params, function(error, tweets, response){
        if (!error) {
            let tweetCount = 0;
            tweets.forEach(element => {
                tweetCount ++
                console.log(' tweet:',tweetCount,', on ',element.created_at,'\n',element.text,'\n')
            });
        }
    })
}

function spotifyThis(query){
    if (query === '' || query === undefined || query === null) {
        spotify.search({type: 'track', query: 'The+Sign+artist:ace+of+base', limit: '1'}, function(error, data){
            if (!error) {
                spotifyResults(data);
            }
        })
    } else {
        spotify.search({type: 'track', query: query, limit: '10'}, function(error, data){
            if (!error) {
                spotifyResults(data);
            }
        })
    }
}

function spotifyResults(data){
    let songs = data.tracks.items
    songs.forEach(element=> {
        console.log('Artist: ',element.artists[0].name)
        console.log('Album: ',element.album.name)
        console.log('Track Name: ',element.name)
        //(element.preview_url === null) ? console.log(true) : console.log(false)
        if(element.preview_url === null) {
            console.log('preview: No preview available \n')
        } else {
            console.log(element.preview_url,'\n')
        }
        });
    };