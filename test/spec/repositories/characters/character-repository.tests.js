
describe('CharacterRepository Tests', function() {

  var characterRepository;

  beforeEach(function() {
    characterRepository = require('../../../../app/repositories/characters/character-repository');
  });

  describe('getCharacterData()', function() {

    it('is a function', function(done) {
      expect(characterRepository.getCharacterData).to.be.a('function');
      done();
    });

  });
});
