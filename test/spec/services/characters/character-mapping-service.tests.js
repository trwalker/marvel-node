
describe('CharacterMappingService Tests', function() {

  var characterMappingService;

  beforeEach(function() {
    characterMappingService = require('../../../../app/services/characters/character-mapping-service');
  });

  describe('lookupCharacterId', function() {

    it('is a function', function(done) {
      expect(characterMappingService.lookupCharacterId).to.be.a('function');
      done();
    });

  });
});
