// Specific custom error classes 
export default class CustomerNotFoundError extends Error {
    constructor(message = 'Customer not found') {
        super(message);
        this.name = 'CustomerNotFoundError';
        this.code = 'CUSTOMER_NOT_FOUND_ERROR';
        this.status = 404;
    }
}
