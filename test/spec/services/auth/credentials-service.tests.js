
describe('CredentialsService Tests', function() {

  var credentialsService;

  var publicKeyMock;
  var privateKeyMock;
  var keyConfigMock;

  beforeEach(function() {
    credentialsService = require('../../../../app/services/auth/credentials-service');

    publicKeyMock = '6ba7749b970cb510f72635ed9fee5119';
    privateKeyMock = 'e19e696baf723c135aed2a729fc4fc45';
    keyConfigMock = { publicKey: publicKeyMock, privateKey: privateKeyMock };

    credentialsService.keyRepository = { getConfig: function() { return keyConfigMock } };

  });

  describe('lookupCredentials', function() {

    it('is a function', function(done) {
      expect(credentialsService.lookupCredentials).to.be.a('function');
      done();
    });

    it('returns public key from key repository', function(done) {
      var credentials = credentialsService.lookupCredentials();

      expect(credentials.publicKey).to.equal(publicKeyMock);
      done();
    });

    it('returns valid md5', function(done) {
      var credentials = credentialsService.lookupCredentials();

      expect(credentials.hash.length).to.equal(32);
      done();
    });

    it('throws exception when keyRepository throws exception', function(done) {
      credentialsService.keyRepository = { getConfig: function() { throw 'unhandled exception' } };
      var lookupCredentials = function() { credentialsService.lookupCredentials(); }

      expect(lookupCredentials).to.throw('Unable to load .app/config/apikey.config.json, make sure the file exists');
      done();
    });

    it('throws exception on null config', function(done) {
      keyConfigMock = null;
      var lookupCredentials = function() { credentialsService.lookupCredentials(); }

      expect(lookupCredentials).to.throw('Invalid .app/config.apikey.config.json');
      done();
    });

    it('throws exception on config with no public key', function(done) {
      keyConfigMock = { foo: 'bar', privateKey: privateKeyMock };
      var lookupCredentials = function() { credentialsService.lookupCredentials(); }

      expect(lookupCredentials).to.throw('Invalid .app/config.apikey.config.json, property "publicKey" is not defined');
      done();
    });

    it('throws exception on config with no private key', function(done) {
      keyConfigMock = { foo: 'bar', publicKey: publicKeyMock };
      var lookupCredentials = function() { credentialsService.lookupCredentials(); }

      expect(lookupCredentials).to.throw('Invalid .app/config.apikey.config.json, property "privateKey" is not defined');
      done();
    });

    it('throws exception on config with empty public key', function(done) {
      keyConfigMock = { publicKey: '', privateKey: privateKeyMock };
      var lookupCredentials = function() { credentialsService.lookupCredentials(); }

      expect(lookupCredentials).to.throw('Invalid .app/config.apikey.config.json, property "publicKey" is not defined');
      done();
    });

    it('throws exception on config with empty public key', function(done) {
      keyConfigMock = { publicKey: publicKeyMock, privateKey: '' };
      var lookupCredentials = function() { credentialsService.lookupCredentials(); }

      expect(lookupCredentials).to.throw('Invalid .app/config.apikey.config.json, property "privateKey" is not defined');
      done();
    });
  });
});
