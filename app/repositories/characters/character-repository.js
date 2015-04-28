const urlFormat = "http://gateway.marvel.com/v1/public/characters/{id}?ts={timeStamp}&apikey={publicKey}&hash={hash}";

function CharacterRepository() {
  this.httpClient = require('request');
}

function getCharacterData(id, timeStamp, publicKey, hash, callback) {
  var requestOptions = buildRequestOptions_(id, timeStamp, publicKey, hash);

  this.httpClient(requestOptions, function(error, response, body) {
    responseHandler_(error, response, callback);
  });
}

function buildRequestOptions_(id, timeStamp, publicKey, hash) {
  var requestUrl = buildRequestUrl_(id, timeStamp, publicKey, hash);

  return {
    method: 'GET',
    uri: requestUrl,
    json: true,
    followRedirect: false,
    gzip: true,
    timeout: 6000
  };
}

function buildRequestUrl_(id, timeStamp, publicKey, hash) {
  return urlFormat.replace('{id}', id).replace('{timeStamp}', timeStamp).replace('{publicKey}', publicKey).replace('{hash}', hash);
}

function responseHandler_(error, response, callback) {
  if(callback && callback.length === 1) {

    switch(response.statusCode) {
      case 200:
        callback(response.body);
        break;
      case 404:
        var NotFoundError = require('../../errors/not-found-error');
        throw new NotFoundError('Character data not found');
        break;
      case 401:
        var NotAuthorizedError = require('../../errors/not-found-error');
        throw new NotAuthorizedError('Not authorized response');
      default:
        throw new Error('Unhandled exception getting character data: ' + error);
        break;
    }
  }
  else {
    throw new Error('Callback must be a function with one parameter, "callback(data)"');
  }
}

CharacterRepository.prototype = {
    getCharacterData: getCharacterData
};

var characterRepository = new CharacterRepository();

module.exports = characterRepository;
