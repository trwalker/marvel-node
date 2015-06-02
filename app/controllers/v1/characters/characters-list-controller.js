
function CharactersListController() {
  this.characterListService_ = require('../../../services/characters/character-list-service');
}

function get(req, res, next) {
  var characterList = this.characterListService_.lookupCharacterList();

  res.status(200).json(characterList);
}

CharactersListController.prototype = {
  get: get
};

var charactersListController = new CharactersListController();

module.exports = charactersListController;
