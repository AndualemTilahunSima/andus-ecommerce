// Specific custom error classes 
export default class CustomerBadRequestError extends Error {
    constructor(message = 'Bad request') {
        super(message);
        this.name = 'CustomerBadRequestError';
        this.code = 'CUSTOMER_BAD_REQUEST_ERROR';
        this.status = 400;
    }
}
