import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
  "ugc-image-upload",
  "user-modify-playback-state",
  "user-follow-modify",
  "user-read-recently-played",
  "user-read-playback-position",
  "playlist-read-collaborative",
  "app-remote-control",
  "user-read-playback-state",
  "user-read-email",
  "streaming",
  "user-top-read",
  "playlist-modify-public",
  "user-library-modify",
  "user-follow-read",
  "user-read-currently-playing",
  "user-library-read",
  "playlist-read-private",
  "user-read-private",
  "playlist-modify-private"
].join(",");

const params = {
  scope: scopes,
}

const queryParams = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
});

export default spotifyApi;

export { LOGIN_URL };