function CharacterListService() {
    this.characterMapRepository_ = require('../../repositories/characters/character-map-repository');
}

function lookupCharacterList() {
    var characterMap = this.characterMapRepository_.getCharacterMap();

    var characterList = {characters: []};

    for (var key of characterMap.values()) {
        characterList.characters.push(key);
    }

    return characterList;
}

CharacterListService.prototype = {
    lookupCharacterList: lookupCharacterList
};

var characterListService = new CharacterListService();

module.exports = characterListService;
