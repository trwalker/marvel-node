
describe('CharacterRepository Tests', function() {

  var characterRepository;
  var response;
  var error;
  var timeStamp = '1427980679859';
  var publicKey = '6ba7749b970cb510f72635ed9fee5119';
  var hash = 'b8fcdc8fd05f1bd62d6c7aa6736afe31';
  var NotFoundError;
  var NotAuthorizedError;

  beforeEach(function() {
    characterRepository = require('../../../../app/repositories/characters/character-repository');

    var data = { data: { results: [{  id: 1009610,
          name: 'spider-man',
          description: 'The guy in the tight red outfit',
          thumbnail: {
            path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b',
            extension: 'jpg'
          },
          comics: {
            items: [{
              title: 'Actor Presents Spider-Man and the Incredible Hulk (2003) #1',
              url: 'http://gateway.marvel.com/v1/public/comics/320'
            }]
          }
        }]
      }
    };

    error = null;
    response = { statusCode: 200, body: { data: data } };

    characterRepository.httpClient_ = { request: function(options, callback) { callback(error, response); } };

    NotFoundError = require('../../../../app/errors/not-found-error');
    NotAuthorizedError = require('../../../../app/errors/not-authorized-error');
  });

  describe('getCharacterData()', function() {

    it('should be a function', function(done) {
      expect(characterRepository.getCharacterData).to.be.a('function');
      done();
    });

    it('should call callback with data on valid input', function(done) {
      characterRepository.getCharacterData(1234, timeStamp, publicKey, hash, function(body) {
        expect(body.data.data.results[0].name).to.equal('spider-man');
        done();
      });
    });

    it('should throw exception when null id', function(done) {
      var getCharacterData = function() { characterRepository.getCharacterData(null, timeStamp, publicKey, hash, function(body) {}); };

      expect(getCharacterData).to.throw(Error, 'CharacterRepository.validateParameters_(): Parameter "id" cannot be null');
      done();
    });

    it('should throw exception when null timeStamp', function(done) {
      var getCharacterData = function() { characterRepository.getCharacterData(1234, null, publicKey, hash, function(body) {}); };

      expect(getCharacterData).to.throw(Error, 'CharacterRepository.validateParameters_(): Parameter "timeStamp" cannot be null');
      done();
    });

    it('should throw exception when null publicKey', function(done) {
      var getCharacterData = function() { characterRepository.getCharacterData(1234, timeStamp, null, hash, function(body) {}); };

      expect(getCharacterData).to.throw(Error, 'CharacterRepository.validateParameters_(): Parameter "publicKey" cannot be null');
      done();
    });

    it('should throw exception when null hash', function(done) {
      var getCharacterData = function() { characterRepository.getCharacterData(1234, timeStamp, publicKey, null, function(body) {}); };

      expect(getCharacterData).to.throw(Error, 'CharacterRepository.validateParameters_(): Parameter "hash" cannot be null');
      done();
    });

    it('should throw exception when callback not passed', function(done) {
      var getCharacterData = function() { characterRepository.getCharacterData(1234, timeStamp, publicKey, hash); };

      expect(getCharacterData).to.throw(Error, 'CharacterRepository.validateParameters_(): Callback must be a function with one parameter, "callback(data)"');
      done();
    });

    it('should throw exception when null callback', function(done) {
      var getCharacterData = function() { characterRepository.getCharacterData(1234, timeStamp, publicKey, hash, null); };

      expect(getCharacterData).to.throw(Error, 'CharacterRepository.validateParameters_(): Callback must be a function with one parameter, "callback(data)"');
      done();
    });

    it('should throw exception when callback with no params', function(done) {
      var getCharacterData = function() { characterRepository.getCharacterData(1234, timeStamp, publicKey, hash, function() {}); };

      expect(getCharacterData).to.throw(Error, 'CharacterRepository.validateParameters_(): Callback must be a function with one parameter, "callback(data)"');
      done();
    });

    it('should throw exception when callback with two params', function(done) {
      var getCharacterData = function() { characterRepository.getCharacterData(1234, timeStamp, publicKey, hash, function(one, two) {}); };

      expect(getCharacterData).to.throw(Error, 'CharacterRepository.validateParameters_(): Callback must be a function with one parameter, "callback(data)"');
      done();
    });

    it('should throw not found exception when 404 status code', function(done) {
      response = { statusCode: 404, body: { data: {} } };
      var getCharacterData = function() { characterRepository.getCharacterData(1234, timeStamp, publicKey, hash, function(body) {}); };

      expect(getCharacterData).to.throw(NotFoundError, 'CharacterRepository.responseHandler_(): Character data not found');

      done();
    });

    it('should throw not authorized exception when 401 status code', function(done) {
      response = { statusCode: 401, body: { data: {} } };
      var getCharacterData = function() { characterRepository.getCharacterData(1234, timeStamp, publicKey, hash, function(body) {}); };

      expect(getCharacterData).to.throw(NotAuthorizedError, 'CharacterRepository.responseHandler_(): Not authorized response');

      done();
    });

    it('should throw unhandled exception when 500 status code', function(done) {
      response = { statusCode: 500, body: { data: {} } };
      var getCharacterData = function() { characterRepository.getCharacterData(1234, timeStamp, publicKey, hash, function(body) {}); };

      expect(getCharacterData).to.throw(Error, 'CharacterRepository.responseHandler_(): Unhandled exception getting character data. Status -  500. Error - null');

      done();
    });

    it('should throw unhandled exception when error is not null', function(done) {
      error = 'Server Error';
      response = { statusCode: 500, body: { data: {} } };
      var getCharacterData = function() { characterRepository.getCharacterData(1234, timeStamp, publicKey, hash, function(body) {}); };

      expect(getCharacterData).to.throw(Error, 'CharacterRepository.responseHandler_(): Unhandled exception getting character data. Error - Server Error');

      done();
    });
  });
});
