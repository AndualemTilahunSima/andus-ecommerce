import Customer from "../model/customer.js";
import CustomerRequest from "../contract/customer-request.js";

/**
 * @param {CustomerRequest} customerRequest
 * @returns {Customer}
 */
export const createCustomer = (customerRequest) => {
  if (!(customerRequest instanceof CustomerRequest)) {
    throw new Error("Argument must be a CustomerRequest");
  }

  return new Customer(
    customerRequest.firstName,
    customerRequest.lastName,
    customerRequest.email,
    customerRequest.address
  );
};

export const getAllCustomers = () => {
  // Placeholder for fetching all customers from a data source
  return [];
}

export const getCustomerById = (id) => {
  // Placeholder for fetching a customer by ID from a data source
  return null;
} 
