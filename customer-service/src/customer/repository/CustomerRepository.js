import Customer from '../model/customer.js';
import CustomerNotFoundError from '../error/CustomerNotFoundError.js';

/**
 * Repository interface for Customer domain
 * Defines the contract for data access operations
 */
export class ICustomerRepository {
  async save(customer) {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByEmail(email) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }

  async update(id, customer) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }
}

/**
 * In-memory implementation of CustomerRepository
 * For development/testing purposes
 */
export class InMemoryCustomerRepository extends ICustomerRepository {
  #customers = new Map();

  async save(customer) {
    if (!(customer instanceof Customer)) {
      throw new Error('Invalid customer object');
    }
    
    this.#customers.set(customer.id, customer);
    return customer;
  }

  async findById(id) {
    const customer = this.#customers.get(id);
    if (!customer) {
      throw new CustomerNotFoundError(`Customer with id ${id} not found`);
    }
    return customer;
  }

  async findByEmail(email) {
    for (const customer of this.#customers.values()) {
      if (customer.email === email.toLowerCase()) {
        return customer;
      }
    }
    return null;
  }

  async findAll() {
    return Array.from(this.#customers.values());
  }

  async update(id, updatedCustomer) {
    if (!this.#customers.has(id)) {
      throw new CustomerNotFoundError(`Customer with id ${id} not found`);
    }
    
    this.#customers.set(id, updatedCustomer);
    return updatedCustomer;
  }

  async delete(id) {
    if (!this.#customers.has(id)) {
      throw new CustomerNotFoundError(`Customer with id ${id} not found`);
    }
    
    const customer = this.#customers.get(id);
    this.#customers.delete(id);
    return customer;
  }

  // Utility method for testing
  clear() {
    this.#customers.clear();
  }
}

/**
 * PostgreSQL implementation of CustomerRepository
 * TODO: Implement with actual database connection
 */
export class PostgresCustomerRepository extends ICustomerRepository {
  constructor(dbConnection) {
    super();
    this.db = dbConnection;
  }

  async save(customer) {
    // TODO: Implement PostgreSQL save logic
    throw new Error('PostgreSQL repository not implemented yet');
  }

  async findById(id) {
    // TODO: Implement PostgreSQL findById logic
    throw new Error('PostgreSQL repository not implemented yet');
  }

  async findByEmail(email) {
    // TODO: Implement PostgreSQL findByEmail logic
    throw new Error('PostgreSQL repository not implemented yet');
  }

  async findAll() {
    // TODO: Implement PostgreSQL findAll logic
    throw new Error('PostgreSQL repository not implemented yet');
  }

  async update(id, customer) {
    // TODO: Implement PostgreSQL update logic
    throw new Error('PostgreSQL repository not implemented yet');
  }

  async delete(id) {
    // TODO: Implement PostgreSQL delete logic
    throw new Error('PostgreSQL repository not implemented yet');
  }
}
