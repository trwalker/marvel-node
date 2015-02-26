
function CharactersController() {
}

function get(req, res, next) {
  var characterResponse = { name: req.params.characterName };
  res.status(200).json(characterResponse);
}

CharactersController.prototype = {
  get: get
};

var charactersController = new CharactersController();

module.exports = charactersController;
