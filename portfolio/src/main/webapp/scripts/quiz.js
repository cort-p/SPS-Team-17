const redirectUri = window.location.origin + '/quiz.html'; 
const accessTokenKey = 'access_token';

// Handles extracting the auth token.
function handleAuthRedirect() {
    if (window.location.hash.length > 1) {
        saveAccessToken();
        window.history.replaceState("", "", redirectUri);
    } else if (localStorage.getItem(accessTokenKey) == null) {
        window.location.href = window.location.origin;
    }
}

function saveAccessToken() {
    const queryString = window.location.hash.substring(1);
    const urlParams = new URLSearchParams(queryString);
    const access_token = urlParams.get(accessTokenKey);
    localStorage.setItem(accessTokenKey, access_token);
}
