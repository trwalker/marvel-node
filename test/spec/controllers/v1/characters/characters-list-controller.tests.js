
describe('CharactersListController Tests', function() {

  var charactersListController;
  var req;
  var res;
  var next;
  var statusReturn;
  var characterList;

  beforeEach(function() {
    statusReturn = { json: function(obj) {} };
    req = {};
    res = { status: function(code) { return statusReturn; } };

    sinon.spy(res, "status");
    sinon.spy(statusReturn, "json");

    charactersListController = require('../../../../../app/controllers/v1/characters/characters-list-controller');

    characterList = {
      characters: [ 'spider-man', 'hulk' ]
    };

    charactersListController.characterListService_ = {
      lookupCharacterList: function() {
        return characterList;
      }
    };
  });

  describe('get()', function() {

    it('should be a function', function(done) {
      expect(charactersListController.get).to.be.a('function');
      done();
    });

    it('should call req.json with character list', function(done) {
      charactersListController.get(req, res, next);

      expect(statusReturn.json.getCall(0).args[0]).to.equal(characterList);
      done();
    });

    it('should call req.status with 200', function(done) {
      charactersListController.get(req, res, next);

      expect(res.status.getCall(0).args[0]).to.equal(200);
      done();
    });

  });
});
