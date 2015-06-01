
function CharactersListController() {

}

function get(req, res, next) {
  res.status(200).json({ hello: 'world' });
}

CharactersListController.prototype = {
  get: get
};

var charactersListController = new CharactersListController();

module.exports = charactersListController;
