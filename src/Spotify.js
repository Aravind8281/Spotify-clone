const apiUrl = "https://accounts.spotify.com/authorize";
const clientId = "d0c1294b45734e2c85bc0aed655885bb";
const redirectUri = "http://localhost:3000/";
const scopes = [
  "user-read-email",
  "user-read-private",
  "user-read-playback-position",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromResponse = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const LoginUrl = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
