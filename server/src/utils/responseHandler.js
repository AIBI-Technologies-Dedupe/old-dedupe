/**
 * Sends a JSON response with a specified status code and message.
 *
 * @param {Object} res - The Express response object.
 * @param {String} message - The message to be sent in the response.
 * @param {Number} statusCode - The HTTP status code (default is 500).
 * @param {Object} [data] - Optional data to include in the response.
 */
const sendResponse = (res, message, statusCode = 200, data = null) => {
    const response = {
        status: statusCode,
        message: message,
    };

    if (data) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

/**
 * Handles errors and sends a formatted error response.
 *
 * @param {Object} res - The Express response object.
 * @param {String} message - The error message to be sent in the response.
 * @param {Number} statusCode - The HTTP status code (default is 500).
 */
exports.handleError = (res, message, statusCode = 500) => {
    return sendResponse(res, message, statusCode);
};

/**
 * Sends a successful response with optional data.
 *
 * @param {Object} res - The Express response object.
 * @param {String} message - The message to be sent in the response.
 * @param {Object} [data] - Optional data to include in the response.
 */
exports.handleSuccess = (res, message, data = null) => {
    return sendResponse(res, message, 200, data);
};
