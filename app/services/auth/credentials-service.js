
function CredentialsService() {
  this.keyRepository_ = require('../../repositories/auth/key-repository');
  this.cryptoService_ = require('crypto');
}

function lookupCredentials() {
  var keyConfig = getKeyConfig_(this.keyRepository_);

  var timesStamp = new Date().getTime().toString();
  var hash = createHash_(this.cryptoService_, timesStamp, keyConfig.privateKey, keyConfig.publicKey);

  return { timeStamp: timesStamp, publicKey: keyConfig.publicKey, hash: hash }
}

function getKeyConfig_(keyRepository) {
  var keyConfig;

  try {
    keyConfig = keyRepository.getConfig();
  }
  catch (e){
    throw new Error('CredentialsService.getKeyConfig_(): Unable to load .app/config/apikey.config.json, make sure the file exists');
  }

  if(!keyConfig) {
    throw new Error('CredentialsService.getKeyConfig_(): Invalid .app/config.apikey.config.json');
  }

  if(!keyConfig.publicKey || keyConfig.publicKey.length === 0) {
    throw new Error('CredentialsService.getKeyConfig_(): Invalid .app/config.apikey.config.json, property "publicKey" is not defined');
  }

  if(!keyConfig.privateKey || keyConfig.privateKey.length === 0) {
    throw new Error('CredentialsService.getKeyConfig_(): Invalid .app/config.apikey.config.json, property "privateKey" is not defined');
  }

  return keyConfig;
}

function createHash_(cryptoService, timeStamp, privateKey, publicKey) {
  var md5Hash = cryptoService.createHash('md5');
  md5Hash.update(timeStamp + privateKey + publicKey);

  return md5Hash.digest('hex');
}

CredentialsService.prototype = {
  lookupCredentials: lookupCredentials
};

var credentialsService = new CredentialsService();

module.exports = credentialsService;
