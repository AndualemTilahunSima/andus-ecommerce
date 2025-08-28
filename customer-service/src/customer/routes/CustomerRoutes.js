import { Router } from 'express';
import CustomerController from '../controller/CustomerController.js';
import CustomerService from '../service/CustomerService.js';
import { InMemoryCustomerRepository } from '../repository/CustomerRepository.js';

/**
 * Customer Routes - RESTful API endpoints
 * Follows Spring Boot REST conventions
 */
export default class CustomerRoutes {
  #router;
  #customerController;

  constructor() {
    this.#router = Router();
    this.#initializeDependencies();
    this.#setupRoutes();
  }

  #initializeDependencies() {
    // Dependency injection setup
    const customerRepository = new InMemoryCustomerRepository();
    const customerService = new CustomerService(customerRepository);
    this.#customerController = new CustomerController(customerService);
  }

  #setupRoutes() {
    // POST /api/customer - Create new customer
    this.#router.post('/', this.#customerController.createCustomer);

    // GET /api/customer - Get all customers
    this.#router.get('/', this.#customerController.getAllCustomers);

    // GET /api/customer/active - Get active customers
    this.#router.get('/active', this.#customerController.getActiveCustomers);

    // GET /api/customer/:id - Get customer by ID
    this.#router.get('/:id', this.#customerController.getCustomerById);

    // PATCH /api/customer/:id/address - Update customer address
    this.#router.patch('/:id/address', this.#customerController.updateCustomerAddress);

    // PATCH /api/customer/:id/email - Update customer email
    this.#router.patch('/:id/email', this.#customerController.updateCustomerEmail);

    // DELETE /api/customer/:id - Delete customer
    this.#router.delete('/:id', this.#customerController.deleteCustomer);
  }

  getRouter() {
    return this.#router;
  }
}
