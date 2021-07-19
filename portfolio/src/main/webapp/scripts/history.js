// Gets user's result history (returns all results that the user has received).
// This needs to be hooked up to the database.
function getHistory() {
    const resultHistory = ['"I Promise" - Radiohead', '"Gratisfaction" - The Strokes', '"Stay Home" - American Football', '"Institutionalized" - Suicidal Tendencies'];

    let history = '';
    for (const result of resultHistory) {
        history += (result + '<br>');
    }

    const historyContainer = document.getElementById('history-container');
    historyContainer.innerHTML = history;
}
