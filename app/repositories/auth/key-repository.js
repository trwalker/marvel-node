
function KeyRepository() {
  this.config = require('../../config/apikey.config.json');
}

var keyRepository = new KeyRepository();

module.exports = keyRepository;
