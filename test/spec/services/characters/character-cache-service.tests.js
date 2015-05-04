
describe('CharacterCacheService Tests', function() {

  var characterCacheService;
  var cacheContainer;

  beforeEach(function() {
    characterCacheService = require('../../../../app/services/characters/character-cache-service');

    cacheContainer = {};
    characterCacheService.cacheContainer_ = cacheContainer;
  });

  describe('lookupCharacter', function() {

    it('should be a function', function(done) {
      expect(characterCacheService.lookupCharacter).to.be.a('function');
      done();
    });

    it('should throw exception when undefined name', function(done) {
      var lookupCharacter = function() { characterCacheService.lookupCharacter(); }
      expect(lookupCharacter).to.throw(Error, 'CharacterCacheService.lookupCharacter(): Parameter "name" cannot be null');

      done();
    });

    it('should throw exception when null name', function(done) {
      var lookupCharacter = function() { characterCacheService.lookupCharacter(null); }
      expect(lookupCharacter).to.throw(Error, 'CharacterCacheService.lookupCharacter(): Parameter "name" cannot be null');

      done();
    });

    it('should return undefined when cache is empty', function(done) {
      var cachedCharacter = characterCacheService.lookupCharacter('spider-man');

      expect(cachedCharacter).to.be.undefined;

      done();
    });

    it('should return null when cache item is null', function(done) {
      cacheContainer['spider-man'] = null;
      var cachedCharacter = characterCacheService.lookupCharacter('spider-man');

      expect(cachedCharacter).to.be.null;

      done();
    });

    it('should return character when cache has character', function(done) {
      cacheContainer['spider-man'] = { name: 'spider-man', id: 1234 };
      var cachedCharacter = characterCacheService.lookupCharacter('spider-man');

      expect(cachedCharacter.id).to.equal(1234);

      done();
    });

    it('should return character case insensitive', function(done) {
      cacheContainer['spider-man'] = { name: 'spider-man', id: 1234 };
      var cachedCharacter = characterCacheService.lookupCharacter('SPIDER-MAN');

      expect(cachedCharacter.id).to.equal(1234);

      done();
    });

  });

  describe('cacheCharacter', function() {

    it('should be a function', function (done) {
      expect(characterCacheService.cacheCharacter).to.be.a('function');
      done();
    });

    it('should throw exception when undefined name', function(done) {
      var cacheCharacter = function() { characterCacheService.cacheCharacter(); }
      expect(cacheCharacter).to.throw(Error, 'CharacterCacheService.cacheCharacter(): Parameter "name" cannot be null');

      done();
    });

    it('should throw exception when null name', function(done) {
      var cacheCharacter = function() { characterCacheService.cacheCharacter(null); }
      expect(cacheCharacter).to.throw(Error, 'CharacterCacheService.cacheCharacter(): Parameter "name" cannot be null');

      done();
    });

    it('should throw exception when undefined character', function(done) {
      var cacheCharacter = function() { characterCacheService.cacheCharacter('spider-man'); }
      expect(cacheCharacter).to.throw(Error, 'CharacterCacheService.cacheCharacter(): Parameter "character" cannot be null');

      done();
    });

    it('should throw exception when null name', function(done) {
      var cacheCharacter = function() { characterCacheService.cacheCharacter('spider-man', null); }
      expect(cacheCharacter).to.throw(Error, 'CharacterCacheService.cacheCharacter(): Parameter "character" cannot be null');

      done();
    });

    it('should cached character when valid name and character', function(done) {
      characterCacheService.cacheCharacter('spider-man', { name: 'spider-man', id: 1234 });
      expect(cacheContainer['spider-man'].id).to.equal(1234);

      done();
    });

    it('should cached character with lower case name', function(done) {
      characterCacheService.cacheCharacter('SPIDER-MAN', { name: 'spider-man', id: 1234 });
      expect(cacheContainer['spider-man'].id).to.equal(1234);

      done();
    });

  });
});
