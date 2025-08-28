import { randomUUID } from 'crypto';

/**
 * Customer Domain Entity
 * Contains business logic and validation rules
 */
export default class Customer {
  #id;
  #firstName;
  #lastName;
  #email;
  #address;
  #createdAt;
  #updatedAt;

  constructor(firstName, lastName, email, address, id = null, createdAt = null, updatedAt = null) {
    this.#validateCustomerData(firstName, lastName, email);
    
    this.#id = id || randomUUID();
    this.#firstName = firstName.trim();
    this.#lastName = lastName.trim();
    this.#email = email.toLowerCase().trim();
    this.#address = address?.trim() || '';
    this.#createdAt = createdAt || new Date();
    this.#updatedAt = updatedAt || new Date();
  }

  // Domain validation
  #validateCustomerData(firstName, lastName, email) {
    if (!firstName || firstName.trim().length === 0) {
      throw new Error('First name is required');
    }
    if (!lastName || lastName.trim().length === 0) {
      throw new Error('Last name is required');
    }
    if (!email || email.trim().length === 0) {
      throw new Error('Email is required');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  // Getters (immutable access)
  get id() { return this.#id; }
  get firstName() { return this.#firstName; }
  get lastName() { return this.#lastName; }
  get email() { return this.#email; }
  get address() { return this.#address; }
  get createdAt() { return this.#createdAt; }
  get updatedAt() { return this.#updatedAt; }
  get fullName() { return `${this.#firstName} ${this.#lastName}`; }

  // Domain methods
  updateAddress(newAddress) {
    this.#address = newAddress?.trim() || '';
    this.#updatedAt = new Date();
  }

  updateEmail(newEmail) {
    if (!newEmail || newEmail.trim().length === 0) {
      throw new Error('Email is required');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      throw new Error('Invalid email format');
    }
    this.#email = newEmail.toLowerCase().trim();
    this.#updatedAt = new Date();
  }

  // Domain events or business rules can be added here
  isActive() {
    // Business rule: customer is active if created within last 2 years
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    return this.#createdAt > twoYearsAgo;
  }

  // For persistence layer
  toJSON() {
    return {
      id: this.#id,
      firstName: this.#firstName,
      lastName: this.#lastName,
      email: this.#email,
      address: this.#address,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt
    };
  }

  // Static factory method
  static fromJSON(data) {
    return new Customer(
      data.firstName,
      data.lastName,
      data.email,
      data.address,
      data.id,
      data.createdAt ? new Date(data.createdAt) : null,
      data.updatedAt ? new Date(data.updatedAt) : null
    );
  }
}