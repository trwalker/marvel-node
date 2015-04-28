
function CharactersService() {
  this.characterMappingService = require('./character-mapping-service');
  this.credentialsService = require('../auth/credentials-service');
  this.characterRespository = require('../../repositories/characters/character-repository');
}

function lookupCharacter(name, callback) {
  var id = this.characterMappingService.lookupId(name);
  var credentials = this.credentialsService.lookupCredentials();

  this.characterRespository.getCharacterData(id,
                                             credentials.timeStamp,
                                             credentials.publicKey,
                                             credentials.hash,
                                             function(data) { getCharacterCallback_(data, callback); });
}

function getCharacterCallback_(data, callback) {
  var characterModel = getCharacterModelFromData_(data);

  callback(characterModel);
}

function getCharacterModelFromData_(data) {
  if(!data || !data.data || !data.data.results || data.data.results.length === 0) {
    throw new Error('Character data not returned from character repository');
  }

  var characterData = data.data.results[0];

  return { id: characterData.id,
           name: characterData.name,
           description: characterData.description,
           image: characterData.thumbnail.path + '.' + characterData.thumbnail.extension,
           comics: characterData.comics.items }
}

CharactersService.prototype = {
  lookupCharacter: lookupCharacter
};

var charactersService = new CharactersService();

module.exports = charactersService;
