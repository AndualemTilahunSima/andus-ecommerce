import CustomerRequest from '../contract/customer-request.js';
import { createCustomer, getAllCustomers } from '../service/customer-service.js';
import createLogger from '../../log/logger.js';
let __filepath = import.meta.url;
const logger = createLogger(__filepath);

/**
 * Handle the creation of a new customer.
 * @param {Object} req - Express request object containing customer data in req.body
 * @param {Object} res - Express response object
 */
export const createCustomerHandler = (req, res) => {
  try {
    logger.info('Received request to create customer', req.logContext);

    // Create a CustomerRequest instance from the request data
    const customerRequest = new CustomerRequest().fromJson(req.body);

    // Validate the customer request
    customerRequest.validate();
    logger.info('Customer request validated successfully', req.logContext);

    // Call the service to create a new customer
    const customer = createCustomer(customerRequest);
    logger.info(`Customer created successfully with ID: ${customer.id}`, req.logContext);

    // Send a success response
    res.status(201).json({ success: true, customer });
  } catch (error) {
    logger.error(`Error creating customer: ${error.message}`, req.logContext);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Handle fetching all customers.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAllCustomersHandler = (req, res) => {
  try {
    logger.info('Received request to fetch all customers', req.logContext);

    const customers = getAllCustomers();
    logger.info(`Fetched ${customers.length} customers successfully`, req.logContext);

    res.status(200).json({ success: true, customers });
  } catch (error) {
    logger.error(`Error fetching customers: ${error.message}`, req.logContext);
    res.status(500).json({ success: false, message: error.message });
  }
};
