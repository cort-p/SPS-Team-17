const AUTHORIZE = "http://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";
var redirect_uri = window.location.origin + "/results.html"; 
var client_id = "7a6472d8bfaa4c4089ab328420d192aa"; //I just hardcoded my own id and secret for now
var client_secret = "1e8c8f313bb04301a8855291a9c77d81";
var _baseUri = "https://api.spotify.com/v1";
var access_token = "";
var refresh_token = "";

//Hardcoded results, will update soon
var songNum = 1;
var seedArtists = "7Ln80lUS6He07XvHI8qqHH"; 
var seedGenres = "alternative";
var seedTracks = "5ruzrDWcT0vuJIOMW7gMnW";
//gets result based on quiz results
//this needs to be hooked up to the algorithm and spotify api to return a result
function getResult() {
    console.log("recommending");
    //callApi( "GET", _baseUri + "/recommendations?limit=1&market=US&seed_artists=7Ln80lUS6He07XvHI8qqHH&seed_genres=alternative&seed_tracks=5ruzrDWcT0vuJIOMW7gMnW", null, handleGetResultResponse);
    callApi( "GET", _baseUri + "/recommendations?limit="+songNum+"&market=US&seed_artists="+seedArtists+"&seed_genres="+seedGenres+"&seed_tracks="+seedTracks, null, handleGetResultResponse);
}
function handleGetResultResponse(){
     if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        if ( data.tracks != null ){
            document.getElementById("albumImage").src = data.tracks[0].album.images[0].url;
		    const resultContainer =document.getElementById('result-container');
            resultContainer.innerText = data.tracks[0].name+" - "+data.tracks[0].artists[0].name;
            document.getElementById("recLink").setAttribute("href",data.tracks[0].external_urls.spotify);
        }
 
    }
    else if ( this.status == 204 ){
 
    }
    else if ( this.status == 401 ){
        refreshAccessToken();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

//removes song from user's recommendation pool
function unlikeSong() {
    const message = "You will not be recommended this song again.";

    const unlikeContainer = document.getElementById('unlike-container');
    unlikeContainer.innerText = message;
}

//gets user's result history (returns all results that the user has received)
//this needs to be hooked up to the database
function getHistory() {
    const resultHistory = ['"I Promise" - Radiohead', '"Gratisfaction" - The Strokes', '"Stay Home" - American Football', '"Institutionalized" - Suicidal Tendencies'];

    
    let history = "";
    for (const result of resultHistory) {
        history += (result + "<br>");
    }
    const historyContainer = document.getElementById('history-container');
    const test = "testing 123";
    historyContainer.innerHTML = history;
    //WIP
}

//Handles getting authorization from spotify and fetching the access token
function onPageLoad(){
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");
    access_token = localStorage.getItem("access_token");

    if(window.location.search.length > 0){       
        handleRedirect();
    }
    //Gets result if token has been acquired and is also not in the authorization page
    if(access_token != "" && window.location.search.length == 0) { 
        getResult();
    }
}
function handleRedirect(){
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("","",redirect_uri);
}
function getCode(){
    let code = null;
    const queryString = window.location.search;
    if(queryString.length > 0)
    {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code');
    }
    return code;
}
function fetchAccessToken( code ){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}
function refreshAccessToken(){
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}
 
function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}
function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if ( data.refresh_token  != undefined ){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}
function requestAuthorization()
{
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret);
    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; // Show Spotify's authorization screen
    alert("Sending to Authorization page");
}

//Calls the api to get the data a function needs 
function callApi(method, url, body, callback){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send(body);
    xhr.onload = callback;
}
