const baseAuthorizeUri = 'http://accounts.spotify.com/authorize';
const redirectUri = window.location.origin + '/quiz.html'; 
const clientId = '0388b5d03ef44a71b49eeb16b70ac679';

function requestAuthorization() {
    let url = baseAuthorizeUri;
    url += '?client_id=' + clientId;
    url += '&response_type=token';
    url += '&redirect_uri=' + encodeURI(redirectUri);
    url += '&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private';
    window.location.href = url; // Show Spotify's authorization screen.
}
