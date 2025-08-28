import CustomerBadRequestError from "../error/CustomerBadRequestError.js";

/**
 * DTO for creating a new customer
 * Handles input validation and data transformation
 */
export default class CreateCustomerDto {
  #firstName;
  #lastName;
  #email;
  #address;

  constructor(data) {
    this.#validateAndSetData(data);
  }

  #validateAndSetData(data) {
    if (!data || typeof data !== 'object') {
      throw new CustomerBadRequestError('Invalid request data');
    }

    // Validate and set firstName
    if (!data.firstName || typeof data.firstName !== 'string' || data.firstName.trim().length === 0) {
      throw new CustomerBadRequestError('First name is required and must be a non-empty string');
    }
    this.#firstName = data.firstName.trim();

    // Validate and set lastName
    if (!data.lastName || typeof data.lastName !== 'string' || data.lastName.trim().length === 0) {
      throw new CustomerBadRequestError('Last name is required and must be a non-empty string');
    }
    this.#lastName = data.lastName.trim();

    // Validate and set email
    if (!data.email || typeof data.email !== 'string' || data.email.trim().length === 0) {
      throw new CustomerBadRequestError('Email is required and must be a non-empty string');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new CustomerBadRequestError('Invalid email format');
    }
    this.#email = data.email.toLowerCase().trim();

    // Set address (optional)
    this.#address = data.address?.trim() || '';
  }

  // Getters
  get firstName() { return this.#firstName; }
  get lastName() { return this.#lastName; }
  get email() { return this.#email; }
  get address() { return this.#address; }

  // Convert to domain object
  toCustomer() {
    return {
      firstName: this.#firstName,
      lastName: this.#lastName,
      email: this.#email,
      address: this.#address
    };
  }

  // Static factory method
  static fromRequest(req) {
    return new CreateCustomerDto(req.body);
  }
}
