
describe('CharacterMappingService Tests', function() {

  var characterMappingService;
  var validCharacters = ['spider-man', 'hulk', 'captain-america', 'iron-man', 'thor', 'wolverine', 'storm', 'jean-grey', 'gambit', 'cyclops', 'beast'];
  var NotFoundError;

  beforeEach(function() {
    characterMappingService = require('../../../../app/services/characters/character-mapping-service');
    NotFoundError = require('../../../../app/errors/not-found-error');
  });

  describe('lookupId', function() {

    it('should be a function', function(done) {
      expect(characterMappingService.lookupId).to.be.a('function');

      done();
    });

    it('should return valid character id given valid character name', function(done) {
      var characterId = characterMappingService.lookupId('spider-man');
      expect(characterId).to.equal(1009610);

      done();
    });

    it('should return valid character id given mixed case character name', function(done) {
      var characterId = characterMappingService.lookupId('SPIDER-man');
      expect(characterId).to.equal(1009610);

      done();
    });

    it('should return valid character id given all valid characters', function(done) {
      for (var i = 0, length = validCharacters.length; i < length; i++) {
        var characterId = characterMappingService.lookupId(validCharacters[i]);
        expect(characterId).to.be.above(0);
      }

      done();
    });

    it('should throw exception given null character name', function(done) {
      var lookUpId = function() { characterMappingService.lookupId(null); }
      expect(lookUpId).to.throw(TypeError, 'CharacterMappingService.lookupCharacterId() null or empty character name');

      done();
    });

    it('should throw exception given empty character name', function(done) {
      var lookUpId = function() { characterMappingService.lookupId(''); }
      expect(lookUpId).to.throw(TypeError, 'CharacterMappingService.lookupCharacterId() null or empty character name');

      done();
    });

    it('should throw exception given bad character name', function(done) {
      var lookUpId = function() { characterMappingService.lookupId('night-man'); }
      expect(lookUpId).to.throw(NotFoundError, 'CharacterMappingService.lookupCharacterId() character not found: night-man');

      done();
    });
  });
});
