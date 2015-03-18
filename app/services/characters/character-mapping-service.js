
function CharacterMappingService() {
}

function lookupCharacterId(characterName) {
  return characterName;
}

CharacterMappingService.prototype = {
  lookupCharacterId: lookupCharacterId
};

var characterMappingService = new CharacterMappingService();

module.exports = characterMappingService;
