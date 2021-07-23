const baseUri = 'https://api.spotify.com/v1';
const accessTokenKey = 'access_token';

var songNum = 1;

// Gets result based on quiz results.
function getResult() {
    // Get values from URL query params.
    let seedGenres = null;
    let targetValence = null;
    let targetPopularity = null;
    let targetTempo = null;
    let targetAcousticness = null;
    const queryString = window.location.search;
    if(queryString.length > 0)
    {
        const urlParams = new URLSearchParams(queryString);
        seedGenres = urlParams.get('genre');
        targetValence = urlParams.get('valence');
        targetPopularity = urlParams.get('popularity');
        targetTempo = urlParams.get('bpm');
        targetAcousticness = urlParams.get('acousticness');
        targetValence = targetValence/100;
        targetPopularity = targetPopularity;
        targetAcousticness = targetAcousticness/100;
    }

    let url = baseUri + '/recommendations';
    url += '?limit=' + songNum;
    url += '&seed_genres=' + seedGenres;
    url += '&target_valence=' + targetValence;
    url += '&target_popularity=' + targetPopularity;
    url += '&target_tempo=' + targetTempo;
    url += '&target_acousticness=' + targetAcousticness;
    callApi('GET', url, null, handleGetResultResponse);
}

function handleGetResultResponse(){
     if (this.status == 200) {
        const data = JSON.parse(this.responseText);
        if (data.tracks != null) {
            document.getElementById('albumImage').src = data.tracks[0].album.images[0].url;

		    const resultContainer = document.getElementById('result-container');
            resultContainer.innerText = data.tracks[0].name + ' - ' + data.tracks[0].artists[0].name;

            document.getElementById('recLink').setAttribute('href', data.tracks[0].external_urls.spotify);
            document.getElementById('spotifyPlayer').src = 'https://open.spotify.com/embed/track/' + data.tracks[0].id;
        }
    } else {
        console.log('Failed: ' + this.responseText);
    }
}

// Calls the api to get the data a function needs.
function callApi(method, url, body, callback){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem(accessTokenKey));
    xhr.send(body);
    xhr.onload = callback;
}

// Removes song from user's recommendation pool.
// This needs to be hooked up to the database.
function unlikeSong() {
    const message = 'You will not be recommended this song again.';

    const unlikeContainer = document.getElementById('unlike-container');
    unlikeContainer.innerText = message;
}
