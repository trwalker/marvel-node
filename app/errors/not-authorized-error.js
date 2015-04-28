
function NotAuthorizedError(message) {
  this.name = 'NotAuthorizedError';
  this.message = message || 'Unable to authenticate request';
  this.statusCode = 401;
}

NotAuthorizedError.prototype = Object.create(Error.prototype);

NotAuthorizedError.prototype.constructor = NotAuthorizedError;

module.exports = NotAuthorizedError;
