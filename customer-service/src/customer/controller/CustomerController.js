import CustomerService from '../service/CustomerService.js';
import CreateCustomerDto from '../dto/CreateCustomerDto.js';
import createLogger from '../../log/logger.js';

const logger = createLogger(import.meta.url);

/**
 * Customer Controller - Presentation Layer
 * Handles HTTP requests and responses
 */
export default class CustomerController {
  #customerService;

  constructor(customerService) {
    if (!(customerService instanceof CustomerService)) {
      throw new Error('CustomerService must be provided');
    }
    this.#customerService = customerService;
  }

  /**
   * Create a new customer
   * POST /api/customer
   */
  createCustomer = async (req, res, next) => {
    try {
      logger.info('Creating new customer', req.logContext);

      const createCustomerDto = CreateCustomerDto.fromRequest(req);
      const customer = await this.#customerService.createCustomer(createCustomerDto);

      logger.info(`Customer created successfully with ID: ${customer.id}`, req.logContext);

      res.status(201).json({
        success: true,
        data: customer.toJSON(),
        message: 'Customer created successfully'
      });
    } catch (error) {
      logger.error(`Error creating customer: ${error.message}`, req.logContext);
      next(error);
    }
  };

  /**
   * Get customer by ID
   * GET /api/customer/:id
   */
  getCustomerById = async (req, res, next) => {
    try {
      const { id } = req.params;
      logger.info(`Fetching customer with ID: ${id}`, req.logContext);

      const customer = await this.#customerService.getCustomerById(id);

      logger.info(`Customer fetched successfully: ${id}`, req.logContext);

      res.status(200).json({
        success: true,
        data: customer.toJSON(),
        message: 'Customer retrieved successfully'
      });
    } catch (error) {
      logger.error(`Error fetching customer: ${error.message}`, req.logContext);
      next(error);
    }
  };

  /**
   * Get all customers
   * GET /api/customer
   */
  getAllCustomers = async (req, res, next) => {
    try {
      logger.info('Fetching all customers', req.logContext);

      const customers = await this.#customerService.getAllCustomers();

      logger.info(`Fetched ${customers.length} customers successfully`, req.logContext);

      res.status(200).json({
        success: true,
        data: customers.map(customer => customer.toJSON()),
        message: 'Customers retrieved successfully',
        count: customers.length
      });
    } catch (error) {
      logger.error(`Error fetching customers: ${error.message}`, req.logContext);
      next(error);
    }
  };

  /**
   * Get active customers
   * GET /api/customer/active
   */
  getActiveCustomers = async (req, res, next) => {
    try {
      logger.info('Fetching active customers', req.logContext);

      const customers = await this.#customerService.getActiveCustomers();

      logger.info(`Fetched ${customers.length} active customers successfully`, req.logContext);

      res.status(200).json({
        success: true,
        data: customers.map(customer => customer.toJSON()),
        message: 'Active customers retrieved successfully',
        count: customers.length
      });
    } catch (error) {
      logger.error(`Error fetching active customers: ${error.message}`, req.logContext);
      next(error);
    }
  };

  /**
   * Update customer address
   * PATCH /api/customer/:id/address
   */
  updateCustomerAddress = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { address } = req.body;

      logger.info(`Updating address for customer: ${id}`, req.logContext);

      const customer = await this.#customerService.updateCustomerAddress(id, address);

      logger.info(`Customer address updated successfully: ${id}`, req.logContext);

      res.status(200).json({
        success: true,
        data: customer.toJSON(),
        message: 'Customer address updated successfully'
      });
    } catch (error) {
      logger.error(`Error updating customer address: ${error.message}`, req.logContext);
      next(error);
    }
  };

  /**
   * Update customer email
   * PATCH /api/customer/:id/email
   */
  updateCustomerEmail = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { email } = req.body;

      logger.info(`Updating email for customer: ${id}`, req.logContext);

      const customer = await this.#customerService.updateCustomerEmail(id, email);

      logger.info(`Customer email updated successfully: ${id}`, req.logContext);

      res.status(200).json({
        success: true,
        data: customer.toJSON(),
        message: 'Customer email updated successfully'
      });
    } catch (error) {
      logger.error(`Error updating customer email: ${error.message}`, req.logContext);
      next(error);
    }
  };

  /**
   * Delete customer
   * DELETE /api/customer/:id
   */
  deleteCustomer = async (req, res, next) => {
    try {
      const { id } = req.params;

      logger.info(`Deleting customer: ${id}`, req.logContext);

      const customer = await this.#customerService.deleteCustomer(id);

      logger.info(`Customer deleted successfully: ${id}`, req.logContext);

      res.status(200).json({
        success: true,
        data: customer.toJSON(),
        message: 'Customer deleted successfully'
      });
    } catch (error) {
      logger.error(`Error deleting customer: ${error.message}`, req.logContext);
      next(error);
    }
  };
}
