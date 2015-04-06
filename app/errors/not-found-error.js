
function NotFoundError(message) {
  this.name = 'NotFoundError';
  this.message = message || 'Default Message';
  this.status = 404;
}

NotFoundError.prototype = Object.create(Error.prototype);

NotFoundError.prototype.constructor = NotFoundError;

module.exports = NotFoundError;