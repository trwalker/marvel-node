
function CharactersService() {
}

function lookupCharacters(id) {
  return { id: id };
}

CharactersService.prototype = {
  lookupCharacters: lookupCharacters
};

var charactersService = new CharactersService();

module.exports = charactersService;
