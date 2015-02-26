
describe('CharactersController Tests', function() {

  var charactersController;
  var req;
  var res;
  var next;

  beforeEach(function() {
    req = { params: { characterName: 'spiderman' }};
    res = { status: function(code) { return { json: function(obj) {} }} };

    sinon.spy(res, "status");

    charactersController = require('../../../../../app/controllers/v1/characters/characterscontroller');
  });

  describe('get()', function() {

    it('is a function', function() {
      expect(charactersController.get).to.be.a('function');
    });

    it('should call res.status() one time', function() {
      charactersController.get(req, res, next);

      expect(res.status.callCount).to.equal(1);
    });

    it('should call res.status() with 200', function() {
        charactersController.get(req, res, next);

      expect(res.status.calledWith(200)).to.equal(true);
    });

  });
});
