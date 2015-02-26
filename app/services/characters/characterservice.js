
function CharacterService() {
}

function getCharacter(id) {
  return { id: id };
}

CharacterService.prototype = {
    getCharacter: getCharacter
};

var characterService = new CharacterService();

module.exports = characterService;
