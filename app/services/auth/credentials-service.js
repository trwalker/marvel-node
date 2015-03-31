
function CredentialsService() {
  this.keyRepository = require('../../repositories/auth/key-repository');
  this.cryptoService = require('crypto');
}

function lookupCredentials() {
  var keyConfig = getKeyConfig(this.keyRepository);

  var timesStamp = new Date().getTime().toString();
  var hash = createHash(this.cryptoService, timesStamp, keyConfig.privateKey, keyConfig.publicKey);

  return { timeStamp: timesStamp, publicKey: keyConfig.publicKey, hash: hash }
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

function createHash(cryptoService, timeStamp, privateKey, publicKey) {
  var md5Hash = cryptoService.createHash('md5');
  md5Hash.update(timeStamp + privateKey, publicKey);

  return md5Hash.digest('hex');
}

CredentialsService.prototype = {
  lookupCredentials: lookupCredentials
};

var credentialsService = new CredentialsService();

module.exports = credentialsService;
