describe('CharacterMappingService Tests', function () {

    var characterMappingService;
    var NotFoundError;

    beforeEach(function () {
        characterMappingService = require('../../../../app/services/characters/character-mapping-service');

        characterMappingService.characterMapRepository_ = {
            getCharacterMap: function () {
                var characterMap = new Map();
                characterMap.set('spider-man', 1009610);

                return characterMap;
            }
        };

        NotFoundError = require('../../../../app/errors/not-found-error');
    });

    describe('lookupId', function () {

        it('should be a function', function (done) {
            expect(characterMappingService.lookupId).to.be.a('function');

            done();
        });

        it('should return valid character id given valid character name', function (done) {
            var characterId = characterMappingService.lookupId('spider-man');
            expect(characterId).to.equal(1009610);

            done();
        });

        it('should return valid character id given mixed case character name', function (done) {
            var characterId = characterMappingService.lookupId('SPIDER-man');
            expect(characterId).to.equal(1009610);

            done();
        });

        it('should throw exception given null character name', function (done) {
            var lookUpId = function () {
                characterMappingService.lookupId(null);
            }
            expect(lookUpId).to.throw(TypeError, 'CharacterMappingService.lookupCharacterId(): Null or empty character name');

            done();
        });

        it('should throw exception given empty character name', function (done) {
            var lookUpId = function () {
                characterMappingService.lookupId('');
            }
            expect(lookUpId).to.throw(TypeError, 'CharacterMappingService.lookupCharacterId(): Null or empty character name');

            done();
        });

        it('should throw exception given bad character name', function (done) {
            var lookUpId = function () {
                characterMappingService.lookupId('night-man');
            }
            expect(lookUpId).to.throw(NotFoundError, 'CharacterMappingService.lookupCharacterId(): Character not found, night-man');

            done();
        });

        it('should rethrow exception from character map respository', function (done) {
            characterMappingService.characterMapRepository_.getCharacterMap = function () {
                throw new Error('Unhandled Error');
            };

            var lookUpId = function () {
                characterMappingService.lookupId('spider-man');
            };

            expect(lookUpId).to.throw(Error, 'Unhandled Error');

            done();
        });

    });
});
