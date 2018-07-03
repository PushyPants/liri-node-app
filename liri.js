require('dotenv').config();
let fs = require('fs');
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
    case 'movie-this': movieThis(query);
    break;
    case 'do-what-it-says': doThis();
    break;
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
        query = 'The+Sign+artist:ace+of+base';
    } 

    spotify.search({type: 'track', query: query, limit: '1'}, function(error, data){
        if (!error) {
            let songs = data.tracks.items
            songs.forEach(element=> {
                console.log('Artist: ',element.artists[0].name)
                console.log('Album: ',element.album.name)
                console.log('Track Name: ',element.name)
                //(element.preview_url === null) ? console.log(true) : console.log(false)
                if(element.preview_url === null) {
                    console.log('preview: No preview available \n')
                } else {
                    console.log('Preview: ',element.preview_url,'\n')
                }
            });
        }
    })
}

function movieThis(query) {
    if(query === '' || query === undefined || query === null) {
        query = 'Mr. Nobody'
    }
    request('https://www.omdbapi.com/?t='+query+'&y=&plot=short&apikey=trilogy', function(error, response, body){
        movieObj = JSON.parse(body);

        if (error) {
            console.log(error)
        } else {
            if (query === 'Mr. Nobody') {
                console.log(`If you haven't watched "Mr. Nobody," you should: http://www.imdb.com/title/tt0485947`)
                console.log(`It's on Netflix!`)
            } else {
                console.log('Title: ',movieObj.Title);
                console.log('Released: ',movieObj.Year);
                console.log('IMDB Rating: ',movieObj.imdbRating);
                console.log('Rotten Tomatoes Score: ',movieObj.Ratings[1].Value);
                console.log('Produced in: ',movieObj.Country);
                console.log('Language: ',movieObj.Language);
                console.log('plot: ',movieObj.Plot);
                console.log('actors: ',movieObj.Actors,'\n');
            }
        };
    });
};

function doThis(){
    fs.readFile('./random.txt', 'utf8', function(error, data){
        if(error){
            console.log(error);
        } else {
            query = data.split(',')
            spotifyThis(query[1])
        }
    })
}
 