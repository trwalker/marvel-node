
function KeyRepository() {
}

function getConfig() {
  return require('../../config/apikey.config.json');
}

KeyRepository.prototype = {
  getConfig: getConfig
}

var keyRepository = new KeyRepository();

module.exports = keyRepository;
