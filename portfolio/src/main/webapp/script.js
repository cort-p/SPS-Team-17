//gets result based on quiz results
//this needs to be hooked up to the algorithm and spotify api to return a result
function getResult()
{
    const songs = ['"I Promise" - Radiohead', '"Gratisfaction" - The Strokes', '"Stay Home" - American Football', '"Institutionalized" - Suicidal Tendencies'];

    const randomSong = songs[Math.floor(Math.random() * songs.length)];

    const resultContainer = document.getElementById('result-container');
    resultContainer.innerText = randomSong;
}

//removes song from user's recommendation pool
function unlikeSong()
{
    const message = "You will not be recommended this song again.";

    const unlikeContainer = document.getElementById('unlike-container');
    unlikeContainer.innerText = message;
}

//gets user's result history (returns all results that the user has received)
//this needs to be hooked up to the database
function getHistory()
{
    const resultHistory = ['"I Promise" - Radiohead', '"Gratisfaction" - The Strokes', '"Stay Home" - American Football', '"Institutionalized" - Suicidal Tendencies'];

    i = 0;
    const history = "";
    while (i < resultHistory.length)
    {
        history += (resultHistory[i] + "<br>");
    }
    const historyContainer = document.getElementById('history-container');
    const test = "testing 123";
    historyContainer.innerText = test;
}