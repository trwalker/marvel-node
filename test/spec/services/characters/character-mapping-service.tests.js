
describe('CharacterMappingService Tests', function() {

  var characterMappingService;
  var validCharacters = ['spider-man', 'hulk', 'captain-america', 'iron-man', 'thor', 'wolverine', 'storm', 'jean-grey', 'gambit', 'cyclops', 'beast'];

  beforeEach(function() {
    characterMappingService = require('../../../../app/services/characters/character-mapping-service');
  });

  describe('lookupId', function() {

    it('is a function', function(done) {
      expect(characterMappingService.lookupId).to.be.a('function');

      done();
    });

    it('returns valid character id', function(done) {
      var characterId = characterMappingService.lookupId('spider-man');
      expect(characterId).to.equal(1009610);

      done();
    });

    it('returns valid character id given mixed case', function(done) {
      var characterId = characterMappingService.lookupId('SPIDER-man');
      expect(characterId).to.equal(1009610);

      done();
    });

    it('returns valid character id for all valid characters', function(done) {
      for (var i = 0, length = validCharacters.length; i < length; i++) {
        var characterId = characterMappingService.lookupId(validCharacters[i]);
        expect(characterId).to.be.above(0);
      }

      done();
    });

    it('throws exception on null character name', function(done) {
      var lookUpId = function() { characterMappingService.lookupId(null); }
      expect(lookUpId).to.throw('CharacterMappingService.lookupCharacterId() null or empty character name');

      done();
    });

    it('throws exception on empty character name', function(done) {
      var lookUpId = function() { characterMappingService.lookupId(''); }
      expect(lookUpId).to.throw('CharacterMappingService.lookupCharacterId() null or empty character name');

      done();
    });

    it('throws exception on bad character name', function(done) {
      var lookUpId = function() { characterMappingService.lookupId('night-man'); }
      expect(lookUpId).to.throw('CharacterMappingService.lookupCharacterId() character not found: night-man');

      done();
    });
  });
});
