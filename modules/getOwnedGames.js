const request = require('request');
const tjs = require('./typeof');

module.exports = (steam64id, apikey, freeGames, appInfo, callback) => {
  if(tjs(steam64id) && tjs(apikey) !== undefined){
    request({
      uri: '/IPlayerService/GetOwnedGames/v1/',
      baseUrl: 'http://api.steampowered.com/',
      qs: {
        key: apikey,
        steamid: steam64id,
        include_played_free_games: freeGames,
        include_appinfo: appInfo
      }
    }, (err, res, body) => {
      if(err) callback("There was an error making your request.");
      let parse = JSON.parse(body);
      let data = parse.response;
      callback(null, data);
    });
  }
}
