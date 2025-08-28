import Customer from '../model/customer.js';
import CreateCustomerDto from '../dto/CreateCustomerDto.js';
import CustomerResponseDto from '../dto/CustomerResponseDto.js';
import CustomerBadRequestError from '../error/CustomerBadRequestError.js';
import CustomerNotFoundError from '../error/CustomerNotFoundError.js';
import { ICustomerRepository } from '../repository/CustomerRepository.js';

/**
 * Customer Service - Application Layer
 * Contains business logic and orchestrates domain operations
 */
export default class CustomerService {
  #customerRepository;

  constructor(customerRepository) {
    if (!(customerRepository instanceof ICustomerRepository)) {
      throw new Error('CustomerRepository must implement ICustomerRepository');
    }
    this.#customerRepository = customerRepository;
  }

  /**
   * Create a new customer
   * @param {CreateCustomerDto} createCustomerDto
   * @returns {Promise<CustomerResponseDto>}
   */
  async createCustomer(createCustomerDto) {
    if (!(createCustomerDto instanceof CreateCustomerDto)) {
      throw new CustomerBadRequestError('Invalid DTO provided');
    }

    // Check if customer with email already exists
    const existingCustomer = await this.#customerRepository.findByEmail(createCustomerDto.email);
    if (existingCustomer) {
      throw new CustomerBadRequestError('Customer with this email already exists');
    }

    // Create domain object
    const customerData = createCustomerDto.toCustomer();
    const customer = new Customer(
      customerData.firstName,
      customerData.lastName,
      customerData.email,
      customerData.address
    );

    // Save to repository
    const savedCustomer = await this.#customerRepository.save(customer);
    
    // Return response DTO
    return CustomerResponseDto.fromCustomer(savedCustomer);
  }

  /**
   * Get customer by ID
   * @param {string} id
   * @returns {Promise<CustomerResponseDto>}
   */
  async getCustomerById(id) {
    if (!id || typeof id !== 'string') {
      throw new CustomerBadRequestError('Valid customer ID is required');
    }

    const customer = await this.#customerRepository.findById(id);
    return CustomerResponseDto.fromCustomer(customer);
  }

  /**
   * Get all customers
   * @returns {Promise<CustomerResponseDto[]>}
   */
  async getAllCustomers() {
    const customers = await this.#customerRepository.findAll();
    return CustomerResponseDto.fromCustomerList(customers);
  }

  /**
   * Update customer address
   * @param {string} id
   * @param {string} newAddress
   * @returns {Promise<CustomerResponseDto>}
   */
  async updateCustomerAddress(id, newAddress) {
    if (!id || typeof id !== 'string') {
      throw new CustomerBadRequestError('Valid customer ID is required');
    }

    const customer = await this.#customerRepository.findById(id);
    customer.updateAddress(newAddress);
    
    const updatedCustomer = await this.#customerRepository.update(id, customer);
    return CustomerResponseDto.fromCustomer(updatedCustomer);
  }

  /**
   * Update customer email
   * @param {string} id
   * @param {string} newEmail
   * @returns {Promise<CustomerResponseDto>}
   */
  async updateCustomerEmail(id, newEmail) {
    if (!id || typeof id !== 'string') {
      throw new CustomerBadRequestError('Valid customer ID is required');
    }

    // Check if email is already taken by another customer
    const existingCustomer = await this.#customerRepository.findByEmail(newEmail);
    if (existingCustomer && existingCustomer.id !== id) {
      throw new CustomerBadRequestError('Email is already taken by another customer');
    }

    const customer = await this.#customerRepository.findById(id);
    customer.updateEmail(newEmail);
    
    const updatedCustomer = await this.#customerRepository.update(id, customer);
    return CustomerResponseDto.fromCustomer(updatedCustomer);
  }

  /**
   * Delete customer
   * @param {string} id
   * @returns {Promise<CustomerResponseDto>}
   */
  async deleteCustomer(id) {
    if (!id || typeof id !== 'string') {
      throw new CustomerBadRequestError('Valid customer ID is required');
    }

    const customer = await this.#customerRepository.delete(id);
    return CustomerResponseDto.fromCustomer(customer);
  }

  /**
   * Get active customers (business rule)
   * @returns {Promise<CustomerResponseDto[]>}
   */
  async getActiveCustomers() {
    const allCustomers = await this.#customerRepository.findAll();
    const activeCustomers = allCustomers.filter(customer => customer.isActive());
    return CustomerResponseDto.fromCustomerList(activeCustomers);
  }
}
