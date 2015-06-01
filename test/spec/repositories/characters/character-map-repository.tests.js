
describe('CharacterMapRepository Tests', function() {

  var characterMapRepository;

  beforeEach(function() {
    characterMapRepository = require('../../../../app/repositories/characters/character-map-repository');
  });

  describe('getCharacterMap()', function() {

    it('should be a function', function(done) {
      expect(characterMapRepository.getCharacterMap).to.be.a('function');
      done();
    });

    it('should return a map of name and id', function(done) {
      var characterMap = characterMapRepository.getCharacterMap();
      var id = characterMap.get('spider-man');

      expect(id).to.equal(1009610);

      done();
    });
  });
});
