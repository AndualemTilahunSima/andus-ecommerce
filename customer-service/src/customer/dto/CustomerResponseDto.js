/**
 * DTO for customer response data
 * Handles data transformation for API responses
 */
export default class CustomerResponseDto {
  #id;
  #firstName;
  #lastName;
  #email;
  #address;
  #createdAt;
  #updatedAt;
  #fullName;

  constructor(customer) {
    this.#id = customer.id;
    this.#firstName = customer.firstName;
    this.#lastName = customer.lastName;
    this.#email = customer.email;
    this.#address = customer.address;
    this.#createdAt = customer.createdAt;
    this.#updatedAt = customer.updatedAt;
    this.#fullName = customer.fullName;
  }

  // Getters
  get id() { return this.#id; }
  get firstName() { return this.#firstName; }
  get lastName() { return this.#lastName; }
  get email() { return this.#email; }
  get address() { return this.#address; }
  get createdAt() { return this.#createdAt; }
  get updatedAt() { return this.#updatedAt; }
  get fullName() { return this.#fullName; }

  // Convert to plain object for JSON response
  toJSON() {
    return {
      id: this.#id,
      firstName: this.#firstName,
      lastName: this.#lastName,
      email: this.#email,
      address: this.#address,
      fullName: this.#fullName,
      createdAt: this.#createdAt.toISOString(),
      updatedAt: this.#updatedAt.toISOString()
    };
  }

  // Static factory methods
  static fromCustomer(customer) {
    return new CustomerResponseDto(customer);
  }

  static fromCustomerList(customers) {
    return customers.map(customer => CustomerResponseDto.fromCustomer(customer));
  }
}
