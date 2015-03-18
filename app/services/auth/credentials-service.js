
function CredentialsService() {
}

function lookupCredentials(id) {
  return { id: id };
}

CredentialsService.prototype = {
  lookupCredentials: lookupCredentials
};

var credentialsService = new CredentialsService();

module.exports = credentialsService;
