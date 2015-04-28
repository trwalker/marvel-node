
function NotFoundError(message) {
  this.name = 'NotFoundError';
  this.message = message || 'Data not found';
  this.statusCode = 404;
}

NotFoundError.prototype = Object.create(Error.prototype);

NotFoundError.prototype.constructor = NotFoundError;

module.exports = NotFoundError;