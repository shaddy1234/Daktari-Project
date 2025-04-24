/**
 * Format success response
 * @param {Object} data - Response data
 * @param {number} statusCode - HTTP status code
 * @returns {Object} Formatted response object
 */
const formatSuccess = (data, statusCode = 200) => {
  return {
    success: true,
    data,
    statusCode,
  };
};

/**
 * Format error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @param {Object} errors - Additional error details
 * @returns {Object} Formatted error object
 */
const formatError = (message, statusCode = 400, errors = null) => {
  const response = {
    success: false,
    error: message,
    statusCode,
  };

  if (errors) {
    response.errors = errors;
  }

  return response;
};

module.exports = {
  formatSuccess,
  formatError,
};
