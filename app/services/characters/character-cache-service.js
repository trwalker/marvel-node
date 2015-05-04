
function CharacterCacheService() {
  global.characters = global.characters || {};
  global.characters.cache = global.characters.cache || {};

  this.cacheContainer_ = global.characters.cache;
}

function lookupCharacter(name) {
  if(!name) {
    throw Error('CharacterCacheService.lookupCharacter(): Parameter "name" cannot be null');
  }

  return this.cacheContainer_[name.toLowerCase()];
}

function cacheCharacter(name, character) {
  if(!name) {
    throw Error('CharacterCacheService.cacheCharacter(): Parameter "name" cannot be null');
  }

  if(!character) {
    throw Error('CharacterCacheService.cacheCharacter(): Parameter "character" cannot be null');
  }

  this.cacheContainer_[name.toLowerCase()] = character;
}

CharacterCacheService.prototype = {
  lookupCharacter: lookupCharacter,
  cacheCharacter: cacheCharacter
};

var characterCacheService = new CharacterCacheService();

module.exports = characterCacheService;
