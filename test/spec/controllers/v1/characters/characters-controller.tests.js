
describe('CharactersController Tests', function() {

  var charactersController;
  var req;
  var res;
  var statusReturn;
  var next;
  var character;

  beforeEach(function() {
    statusReturn = { json: function(obj) {} };
    req = { params: { characterName: 'spider-man'} };
    res = { status: function(code) { return statusReturn; } };
    next = function() {};

    sinon.spy(res, "status");
    sinon.spy(statusReturn, "json");

    charactersController = require('../../../../../app/controllers/v1/characters/characters-controller');

    character = { id: 1234,
                  name: 'spider-man',
                  description: 'The amazing spider-man',
                  image: '',
                  comics: [] };

    charactersController.characterService_ = { lookupCharacter: function(characterName, callback) { callback(character) } };
  });

  describe('get()', function() {

    it('should be a function', function(done) {
      expect(charactersController.get).to.be.a('function');
      done();
    });

    it('should call req.json with character', function(done) {
      charactersController.get(req, res, next);

      expect(statusReturn.json.getCall(0).args[0]).to.equal(character);
      done();
    });

    it('should call req.status with 200', function(done) {
      charactersController.get(req, res, next);

      expect(res.status.getCall(0).args[0]).to.equal(200);
      done();
    });

  });
});
