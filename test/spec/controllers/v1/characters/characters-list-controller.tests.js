
describe('CharactersListController Tests', function() {

  var charactersListController;
  var req;
  var res;
  var next;

  beforeEach(function() {
    req = {};
    res = { status: function(code) { return { json: function(obj) {} }} };

    sinon.spy(res, "status");

    charactersListController = require('../../../../../app/controllers/v1/characters/characters-list-controller');
  });

  describe('get()', function() {

    it('should be a function', function(done) {
      expect(charactersListController.get).to.be.a('function');
      done();
    });

    it('should call res.status() one time', function(done) {
      charactersListController.get(req, res, next);

      expect(res.status.callCount).to.equal(1);
      done();
    });

    it('should call res.status() with 200', function(done) {
        charactersListController.get(req, res, next);

      expect(res.status.calledWith(200)).to.equal(true);
      done();
    });

  });
});
