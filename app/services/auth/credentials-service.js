
function CredentialsService() {
  this.keyRepository = require('../../repositories/auth/key-repository');
}

function lookupCredentials() {
  var keyConfig = getKeyConfig(this.keyRepository);

  return { timeStamp: new Date().getTime(), publicKey: keyConfig.publicKey, hash: 'b8fcdc8fd05f1bd62d6c7aa6736afe31' }
}

function getKeyConfig(keyRepository) {
  var keyConfig;

  try {
    keyConfig = keyRepository.getConfig();
  }
  catch (e){
    throw 'Unable to load .app/config/apikey.config.json, make sure the file exists';
  }

  if(!keyConfig) {
    throw 'Invalid .app/config.apikey.config.json';
  }

  if(!keyConfig.publicKey || keyConfig.publicKey.length === 0) {
    throw 'Invalid .app/config.apikey.config.json, property "publicKey" is not defined';
  }

  if(!keyConfig.privateKey || keyConfig.privateKey.length === 0) {
    throw 'Invalid .app/config.apikey.config.json, property "privateKey" is not defined';
  }

  return keyConfig;
}

CredentialsService.prototype = {
  lookupCredentials: lookupCredentials
};

var credentialsService = new CredentialsService();

module.exports = credentialsService;
