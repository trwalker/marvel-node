describe('CharacterMapRepository Tests', function () {

    var characterMapRepository;

    beforeEach(function () {
        characterMapRepository = require('../../../../app/repositories/characters/character-map-repository');
        characterMapRepository.settings = { baseUri: 'http://my.api.com/' };
    });

    describe('getCharacterMap()', function () {

        it('should be a function', function (done) {
            expect(characterMapRepository.getCharacterMap).to.be.a('function');
            done();
        });

        it('should return a map of character with id', function (done) {
            var characterMap = characterMapRepository.getCharacterMap();
            var character = characterMap.get('spider-man');

            expect(character.id).to.equal(1009610);

            done();
        });

        it('should return a map of character with character details URI', function (done) {
            var characterMap = characterMapRepository.getCharacterMap();
            var character = characterMap.get('spider-man');

            expect(character.resourceUri).to.equal('http://my.api.com/v1/characters/spider-man');

            done();
        });

        it('should return a map of character with character name', function (done) {
            var characterMap = characterMapRepository.getCharacterMap();
            var character = characterMap.get('spider-man');

            expect(character.name).to.equal('spider-man');

            done();
        });

        it('should return a map of character with image URI', function (done) {
            var characterMap = characterMapRepository.getCharacterMap();
            var character = characterMap.get('spider-man');

            expect(character.imageUri).to.equal('http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg');

            done();
        });
    });
});
