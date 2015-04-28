
function CharactersController() {
  this.characterService = require('../../../services/characters/characters-service');
}

function get(req, res, next) {
  var characterName = req.params.characterName;

  this.characterService.lookupCharacter(characterName, function (character) {
    characterLookupCallback_(character, res, next);
  });
}

function characterLookupCallback_(character, res, next) {
  res.status(200).json(character);
  next();
}

CharactersController.prototype = {
  get: get
};

var charactersController = new CharactersController();

module.exports = charactersController;
