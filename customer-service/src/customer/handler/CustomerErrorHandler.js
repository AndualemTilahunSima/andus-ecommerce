import CustomerBadRequestError from '../error/CustomerBadRequestError.js';
import CustomerNotFoundError from '../error/CustomerNotFoundError.js';
import { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } from '../error/ErrorCodes.js';
import { errorResponse } from '../error/ErrorResponse.js';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomerBadRequestError) {
    return errorResponse(res, BAD_REQUEST, err.message, err.code);
  }
  if (err instanceof CustomerNotFoundError) {
    return errorResponse(res, NOT_FOUND, err.message, err.code);
  }

  // Generic fallback
  return errorResponse(res, INTERNAL_SERVER_ERROR, err.message || 'Internal Server Error', 'INTERNAL_SERVER_ERROR');
}

