// Specific custom error classes 
class CustomerNotFoundError extends Error {
    constructor(message) {
        super(message, 'CUSTOMER_NOT_FOUND_ERROR');
    }
} 
export default CustomerNotFoundError;
