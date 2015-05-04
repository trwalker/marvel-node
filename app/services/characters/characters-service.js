
function CharactersService() {
  this.characterMappingService_ = require('./character-mapping-service');
  this.credentialsService_ = require('../auth/credentials-service');
  this.characterCacheService_ = require('./character-cache-service');
  this.characterRespository_ = require('../../repositories/characters/character-repository');
}

function lookupCharacter(name, callback) {
  var cachedCharacter = this.characterCacheService_.lookupCharacter(name);

  if(cachedCharacter) {
    callback(cachedCharacter);
  }
  else {
    var id = this.characterMappingService_.lookupId(name);
    var credentials = this.credentialsService_.lookupCredentials();
    var characterCacheService = this.characterCacheService_;

    this.characterRespository_.getCharacterData(id,
      credentials.timeStamp,
      credentials.publicKey,
      credentials.hash,
      function(data) { getCharacterCallback_(data, callback, characterCacheService); });
  }
}

function getCharacterCallback_(data, callback, characterCacheService) {
  var characterModel = getCharacterModelFromData_(data);
  characterCacheService.cacheCharacter(characterModel.name, characterModel);

  callback(characterModel);
}

function getCharacterModelFromData_(data) {
  if(!data || !data.data || !data.data.results || data.data.results.length === 0) {
    throw new Error('CharactersService.getCharacterModelFromData_(): Character data not returned from character repository');
  }

  var characterData = data.data.results[0];

  return { id: characterData.id,
           name: characterData.name,
           description: characterData.description,
           image: characterData.thumbnail.path + '.' + characterData.thumbnail.extension,
           comics: characterData.comics.items };
}

CharactersService.prototype = {
  lookupCharacter: lookupCharacter
};

var charactersService = new CharactersService();

module.exports = charactersService;
