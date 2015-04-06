
describe('CharactersController Tests', function() {

  var charactersController;
  var req;
  var res;
  var next;

  beforeEach(function() {
    req = { params: { characterName: 'spider-man'} };
    res = { status: function(code) { return { json: function(obj) {} }} };

    sinon.spy(res, "status");

    charactersController = require('../../../../../app/controllers/v1/characters/characters-controller');
  });

  describe('get()', function() {

    it('should be a function', function(done) {
      expect(charactersController.get).to.be.a('function');
      done();
    });

    it('should call res.status() one time', function(done) {
      charactersController.get(req, res, next);

      expect(res.status.callCount).to.equal(1);
      done();
    });

    it('should call res.status() with 200', function(done) {
        charactersController.get(req, res, next);

      expect(res.status.calledWith(200)).to.equal(true);
      done();
    });

  });
});
