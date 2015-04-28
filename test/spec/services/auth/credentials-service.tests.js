
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

    credentialsService.keyRepository_ = { getConfig: function() { return keyConfigMock } };
    credentialsService.cryptoService_ = { createHash: function(algorithm) {
                                            return {
                                              update: function(data) { },
                                              digest: function(format) { return 'b8fcdc8fd05f1bd62d6c7aa6736afe31' }
                                            }
                                          }
                                       };
  });

  describe('lookupCredentials', function() {

    it('should be a function', function(done) {
      expect(credentialsService.lookupCredentials).to.be.a('function');
      done();
    });

    it('should return public key from keyRespository', function(done) {
      var credentials = credentialsService.lookupCredentials();

      expect(credentials.publicKey).to.equal(publicKeyMock);
      done();
    });

    it('should return md5 from cryptoService', function(done) {
      var credentials = credentialsService.lookupCredentials();

      expect(credentials.hash).to.equal('b8fcdc8fd05f1bd62d6c7aa6736afe31');
      done();
    });

    it('should throw exception when keyRepository throws exception', function(done) {
      credentialsService.keyRepository_ = { getConfig: function() { throw 'unhandled exception' } };
      var lookupCredentials = function() { credentialsService.lookupCredentials(); }

      expect(lookupCredentials).to.throw(Error, 'Unable to load .app/config/apikey.config.json, make sure the file exists');
      done();
    });

    it('should throw exception when null config', function(done) {
      keyConfigMock = null;
      var lookupCredentials = function() { credentialsService.lookupCredentials(); }

      expect(lookupCredentials).to.throw(Error, 'Invalid .app/config.apikey.config.json');
      done();
    });

    it('should throw exception when config with no public key', function(done) {
      keyConfigMock = { foo: 'bar', privateKey: privateKeyMock };
      var lookupCredentials = function() { credentialsService.lookupCredentials(); }

      expect(lookupCredentials).to.throw(Error, 'Invalid .app/config.apikey.config.json, property "publicKey" is not defined');
      done();
    });

    it('should throw exception when config with no private key', function(done) {
      keyConfigMock = { foo: 'bar', publicKey: publicKeyMock };
      var lookupCredentials = function() { credentialsService.lookupCredentials(); }

      expect(lookupCredentials).to.throw(Error, 'Invalid .app/config.apikey.config.json, property "privateKey" is not defined');
      done();
    });

    it('should throw exception when config with empty public key', function(done) {
      keyConfigMock = { publicKey: '', privateKey: privateKeyMock };
      var lookupCredentials = function() { credentialsService.lookupCredentials(); }

      expect(lookupCredentials).to.throw(Error, 'Invalid .app/config.apikey.config.json, property "publicKey" is not defined');
      done();
    });

    it('should throw exception when config with empty public key', function(done) {
      keyConfigMock = { publicKey: publicKeyMock, privateKey: '' };
      var lookupCredentials = function() { credentialsService.lookupCredentials(); }

      expect(lookupCredentials).to.throw(Error, 'Invalid .app/config.apikey.config.json, property "privateKey" is not defined');
      done();
    });
  });
});
