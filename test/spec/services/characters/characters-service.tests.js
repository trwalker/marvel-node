
describe('CharactersService Tests', function() {

  var charactersService;

  beforeEach(function() {
    charactersService = require('../../../../app/services/characters/characters-service');
  });

  describe('lookupCharacters', function() {

    it('is a function', function(done) {
      expect(charactersService.lookupCharacters).to.be.a('function');
      done();
    });

  });
});
