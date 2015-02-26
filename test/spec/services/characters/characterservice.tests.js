
describe('CharacterService Tests', function() {

  var characterService;

  beforeEach(function() {
    characterService = require('../../../../app/services/characters/characterservice');
  });

  describe('getCharacter()', function() {

    it('is a function', function() {
      expect(characterService.getCharacter).to.be.a('function');
    });

  });
});
