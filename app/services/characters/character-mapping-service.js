
function CharacterMappingService() {
}

function lookupId(characterName) {
  if(!characterName || characterName.length === 0) {
    throw new TypeError('CharacterMappingService.lookupCharacterId(): Null or empty character name');
  }

  switch(characterName.toLowerCase()) {
    case 'spider-man':
      return 1009610;
    case 'hulk':
      return 1009351;
    case 'captain-america':
      return 1009220;
    case 'iron-man':
      return 1009368;
    case 'thor':
      return 1009664;
    case 'wolverine':
      return 1009718;
    case 'storm':
      return 1009629;
    case 'jean-grey':
      return 1009496;
    case 'gambit':
      return 1009313;
    case 'cyclops':
      return 1009257;
    case 'beast':
      return 1009175;
    default:
      var NotFoundError = require('../../errors/not-found-error');
      throw new NotFoundError('CharacterMappingService.lookupCharacterId(): Character not found, ' + characterName);
  }
}

CharacterMappingService.prototype = {
  lookupId: lookupId
};

var characterMappingService = new CharacterMappingService();

module.exports = characterMappingService;
