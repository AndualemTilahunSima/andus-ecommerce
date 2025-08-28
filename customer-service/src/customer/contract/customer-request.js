import CustomerBadRequestError from "../error/customer-bad-request-error.js";
class CustomerRequest {
    firstName;
    lastName;
    email;
    address;

    /**
     * Validate the customer request data
     * @returns {string} Validation summary
     */
    validate() {
        const nameRegex = /^[A-Za-z]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate firstName
        if (!this.firstName || this.firstName.trim() === "" || this.firstName.length === 0) {
            throw new CustomerBadRequestError("First name is required");
        }
        if (!nameRegex.test(this.firstName)) {
            throw new CustomerBadRequestError("First name must contain only letters");
        }

        // Validate lastName
        if (!this.lastName || this.lastName.trim() === "" || this.lastName.length === 0) {
            throw new CustomerBadRequestError("Last name is required");
        }
        if (!nameRegex.test(this.lastName)) {
            throw new CustomerBadRequestError("Last name must contain only letters");
        }

        // Validate email
        if (!this.email || this.email.trim() === "" || this.email.length === 0) {
            throw new CustomerBadRequestError("Email is required");
        }
        if (!emailRegex.test(this.email)) {
            throw new CustomerBadRequestError("Email is not valid");
        }
    }

    /**
     * Map JSON data to the CustomerRequest instance
     * @param {Object} json 
     */
    fromJson(json) {
        this.firstName = json.firstName;
        this.lastName = json.lastName;
        this.email = json.email;
        this.address = json.address;
    }
}

export default CustomerRequest;
