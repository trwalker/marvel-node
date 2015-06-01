
describe('CharacterListRepository Tests', function() {

  var characterListRepository;

  beforeEach(function() {
    characterListRepository = require('../../../../app/repositories/characters/character-list-repository');
  });

  describe('getCharacterListData()', function() {

    it('should be a function', function(done) {
      expect(characterListRepository.getCharacterListData).to.be.a('function');
      done();
    });

    it('should return an object with an array', function(done) {
      var characterList = characterListRepository.getCharacterListData();
      expect(characterList.characters).to.be.a('array');

      done();
    });

    it('should return an object with an array of name and id', function(done) {
      var characterList = characterListRepository.getCharacterListData();
      var name = characterList.characters[0].name;
      var id = characterList.characters[0].id;

      expect(name).to.equal('spider-man');
      expect(id).to.equal(1009610);

      done();
    });
  });
});
