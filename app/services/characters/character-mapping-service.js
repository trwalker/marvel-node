function CharacterMappingService() {
    this.characterMapRepository_ = require('../../repositories/characters/character-map-repository');
}

function lookupId(characterName) {
    if (!characterName || characterName.length === 0) {
        throw new TypeError('CharacterMappingService.lookupCharacterId(): Null or empty character name');
    }

    var characterMap = this.characterMapRepository_.getCharacterMap();

    var character = characterMap.get(characterName.toLowerCase());
    if (!character) {
        var NotFoundError = require('../../errors/not-found-error');
        throw new NotFoundError('CharacterMappingService.lookupCharacterId(): Character not found, ' + characterName);
    }

    return character.id;
}

CharacterMappingService.prototype = {
    lookupId: lookupId
};

var characterMappingService = new CharacterMappingService();

module.exports = characterMappingService;
