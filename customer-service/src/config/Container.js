import CustomerService from '../customer/service/CustomerService.js';
import CustomerController from '../customer/controller/CustomerController.js';
import { SequelizeCustomerRepository } from '../customer/repository/SequelizeCustomerRepository.js';
import { testConnection } from './database.js';

/**
 * Simple Dependency Injection Container
 * Manages dependencies and their lifecycle
 */
export default class Container {
  #services = new Map();

  constructor() {
    this.#registerServices();
  }

  async #registerServices() {
    // Test database connection first
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error('Database connection failed. Please check your configuration.');
    }

    // Register repositories
    this.#services.set('customerRepository', new SequelizeCustomerRepository());

    // Register services
    this.#services.set('customerService', new CustomerService(
      this.#services.get('customerRepository')
    ));

    // Register controllers
    this.#services.set('customerController', new CustomerController(
      this.#services.get('customerService')
    ));
  }

  /**
   * Get a service from the container
   * @param {string} serviceName
   * @returns {any} The service instance
   */
  get(serviceName) {
    const service = this.#services.get(serviceName);
    if (!service) {
      throw new Error(`Service '${serviceName}' not found in container`);
    }
    return service;
  }

  /**
   * Register a new service
   * @param {string} serviceName
   * @param {any} serviceInstance
   */
  register(serviceName, serviceInstance) {
    this.#services.set(serviceName, serviceInstance);
  }

  /**
   * Get all registered service names
   * @returns {string[]}
   */
  getServiceNames() {
    return Array.from(this.#services.keys());
  }
}
