//gets result based on quiz results
//this needs to be hooked up to the algorithm and spotify api to return a result
function getResult() {
    const songs = ['https://open.spotify.com/embed/track/06KakoES48DwEoAiUIdjmg', 'https://open.spotify.com/embed/track/1OXGJ7jRok4c3KBnIYkuwH', 
    'https://open.spotify.com/embed/track/35xnCYrjXbuqhgl7E0rhck', 'https://open.spotify.com/embed/track/6KXuDNOwiNR0q7KLGXs3Bo'];

    const randomSong = songs[Math.floor(Math.random() * songs.length)];

    document.getElementById('spotifyPlayer').src = randomSong;
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
    const resultHistory = ['https://open.spotify.com/embed/track/06KakoES48DwEoAiUIdjmg', 'https://open.spotify.com/embed/track/1OXGJ7jRok4c3KBnIYkuwH', 
    'https://open.spotify.com/embed/track/35xnCYrjXbuqhgl7E0rhck', 'https://open.spotify.com/embed/track/6KXuDNOwiNR0q7KLGXs3Bo'];

    
    let history = "";
    for (const result of resultHistory) {
        history += (result + "<br>");
    }
    const historyContainer = document.getElementById('history-container');
    const test = "testing 123";
    historyContainer.innerHTML = history;
    //WIP
}
/*i promise - radiohead
    https://open.spotify.com/embed/track/06KakoES48DwEoAiUIdjmg
happy ending- the strokes
    https://open.spotify.com/embed/track/1OXGJ7jRok4c3KBnIYkuwH
stay home - american football
    https://open.spotify.com/embed/track/35xnCYrjXbuqhgl7E0rhck
red light - the strokes
    https://open.spotify.com/embed/track/6KXuDNOwiNR0q7KLGXs3Bo
*/