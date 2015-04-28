const urlFormat = "http://gateway.marvel.com/v1/public/characters/{id}?ts={timeStamp}&apikey={publicKey}&hash={hash}";

function CharacterRepository() {
  this.httpClient_ = { request: require('request') };
}

function getCharacterData(id, timeStamp, publicKey, hash, callback) {
  validateParamters_(id, timeStamp, publicKey, hash, callback);

  var requestOptions = buildRequestOptions_(id, timeStamp, publicKey, hash);

  this.httpClient_.request(requestOptions, function(error, response, body) {
    responseHandler_(error, response, callback);
  });
}

function validateParamters_(id, timeStamp, publicKey, hash, callback) {
  if(!id) {
    throw new Error('CharacterRepository.validateParamters_(): Parameter "id" cannot be null');
  }
  else if(!timeStamp) {
    throw new Error('CharacterRepository.validateParamters_(): Parameter "timeStamp" cannot be null');
  }
  else if(!publicKey) {
    throw new Error('CharacterRepository.validateParamters_(): Parameter "publicKey" cannot be null');
  }
  else if(!hash) {
    throw new Error('CharacterRepository.validateParamters_(): Parameter "hash" cannot be null');
  }
  else if(!callback || callback.length !== 1) {
    throw new Error('CharacterRepository.validateParamters_(): Callback must be a function with one parameter, "callback(data)"');
  }
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
  switch(response.statusCode) {
    case 200:
      callback(response.body);
      break;
    case 404:
      var NotFoundError = require('../../errors/not-found-error');
      throw new NotFoundError('CharacterRepository.responseHandler_(): Character data not found');
      break;
    case 401:
      var NotAuthorizedError = require('../../errors/not-found-error');
      throw new NotAuthorizedError('CharacterRepository.responseHandler_(): Not authorized response');
    default:
      throw new Error('CharacterRepository.responseHandler_(): Unhandled exception getting character data, ' + error);
      break;
  }
}

CharacterRepository.prototype = {
    getCharacterData: getCharacterData
};

var characterRepository = new CharacterRepository();

module.exports = characterRepository;
