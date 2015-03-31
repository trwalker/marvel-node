
/* istanbul ignore next */
function KeyRepository() {
}

/* istanbul ignore next */
function getConfig() {
  return require('../../config/apikey.config.json');
}

/* istanbul ignore next */
KeyRepository.prototype = {
  getConfig: getConfig
}

/* istanbul ignore next */
var keyRepository = new KeyRepository();

/* istanbul ignore next */
module.exports = keyRepository;
