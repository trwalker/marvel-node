
function CharactersController() {
  this.characterService_ = require('../../../services/characters/character-service');
}

function get(req, res, next) {
  var characterName = req.params.characterName;

  this.characterService_.lookupCharacter(characterName, function (character) {
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
