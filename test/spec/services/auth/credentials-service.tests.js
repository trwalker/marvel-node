
describe('CredentialsService Tests', function() {

  var credentialsService;

  beforeEach(function() {
    credentialsService = require('../../../../app/services/auth/credentials-service');
  });

  describe('lookupCredentials', function() {

    it('is a function', function(done) {
      expect(credentialsService.lookupCredentials).to.be.a('function');
      done();
    });

  });
});
