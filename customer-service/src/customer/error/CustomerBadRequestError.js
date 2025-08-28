// Specific custom error classes 
class CustomerBadRequestError extends Error {
    constructor(message) {
        super(message, 'CUSTOMER_BAD_REQUEST_ERROR');
    }
} 
export default CustomerBadRequestError;
