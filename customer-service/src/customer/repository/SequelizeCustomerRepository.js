import { Op } from 'sequelize';
import Customer from '../model/customer.js';
import CustomerModel from '../model/CustomerModel.js';
import CustomerNotFoundError from '../error/CustomerNotFoundError.js';
import { ICustomerRepository } from './CustomerRepository.js';

/**
 * Sequelize implementation of CustomerRepository
 * Implements the repository interface using Sequelize ORM
 */
export class SequelizeCustomerRepository extends ICustomerRepository {
  constructor() {
    super();
  }

  /**
   * Convert Sequelize model to domain entity
   * @param {Object} sequelizeModel
   * @returns {Customer}
   */
  #toDomainEntity(sequelizeModel) {
    if (!sequelizeModel) return null;
    
    return new Customer(
      sequelizeModel.firstName,
      sequelizeModel.lastName,
      sequelizeModel.email,
      sequelizeModel.address,
      sequelizeModel.id,
      sequelizeModel.createdAt,
      sequelizeModel.updatedAt
    );
  }

  /**
   * Convert domain entity to Sequelize model data
   * @param {Customer} customer
   * @returns {Object}
   */
  #toSequelizeData(customer) {
    return {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      address: customer.address
    };
  }

  async save(customer) {
    if (!(customer instanceof Customer)) {
      throw new Error('Invalid customer object');
    }

    try {
      const customerData = this.#toSequelizeData(customer);
      const sequelizeModel = await CustomerModel.create(customerData);
      return this.#toDomainEntity(sequelizeModel);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Customer with this email already exists');
      }
      throw new Error(`Failed to save customer: ${error.message}`);
    }
  }

  async findById(id) {
    if (!id) {
      throw new Error('Customer ID is required');
    }

    try {
      const sequelizeModel = await CustomerModel.findByPk(id);
      if (!sequelizeModel) {
        throw new CustomerNotFoundError(`Customer with id ${id} not found`);
      }
      return this.#toDomainEntity(sequelizeModel);
    } catch (error) {
      if (error instanceof CustomerNotFoundError) {
        throw error;
      }
      throw new Error(`Failed to find customer by ID: ${error.message}`);
    }
  }

  async findByEmail(email) {
    if (!email) {
      return null;
    }

    try {
      const sequelizeModel = await CustomerModel.findOne({
        where: { email: email.toLowerCase() }
      });
      return this.#toDomainEntity(sequelizeModel);
    } catch (error) {
      throw new Error(`Failed to find customer by email: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const sequelizeModels = await CustomerModel.findAll({
        order: [['createdAt', 'DESC']]
      });
      return sequelizeModels.map(model => this.#toDomainEntity(model));
    } catch (error) {
      throw new Error(`Failed to find all customers: ${error.message}`);
    }
  }

  async update(id, customer) {
    if (!id) {
      throw new Error('Customer ID is required');
    }
    if (!(customer instanceof Customer)) {
      throw new Error('Invalid customer object');
    }

    try {
      const customerData = this.#toSequelizeData(customer);
      const [updatedRows] = await CustomerModel.update(customerData, {
        where: { id },
        returning: true
      });

      if (updatedRows === 0) {
        throw new CustomerNotFoundError(`Customer with id ${id} not found`);
      }

      // Fetch the updated customer
      const updatedModel = await CustomerModel.findByPk(id);
      return this.#toDomainEntity(updatedModel);
    } catch (error) {
      if (error instanceof CustomerNotFoundError) {
        throw error;
      }
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Email is already taken by another customer');
      }
      throw new Error(`Failed to update customer: ${error.message}`);
    }
  }

  async delete(id) {
    if (!id) {
      throw new Error('Customer ID is required');
    }

    try {
      const customer = await this.findById(id);
      const deletedRows = await CustomerModel.destroy({
        where: { id }
      });

      if (deletedRows === 0) {
        throw new CustomerNotFoundError(`Customer with id ${id} not found`);
      }

      return customer;
    } catch (error) {
      if (error instanceof CustomerNotFoundError) {
        throw error;
      }
      throw new Error(`Failed to delete customer: ${error.message}`);
    }
  }

  /**
   * Find customers by partial name match
   * @param {string} searchTerm
   * @returns {Promise<Customer[]>}
   */
  async findByName(searchTerm) {
    if (!searchTerm) {
      return [];
    }

    try {
      const sequelizeModels = await CustomerModel.findAll({
        where: {
          [Op.or]: [
            { firstName: { [Op.iLike]: `%${searchTerm}%` } },
            { lastName: { [Op.iLike]: `%${searchTerm}%` } }
          ]
        },
        order: [['createdAt', 'DESC']]
      });
      return sequelizeModels.map(model => this.#toDomainEntity(model));
    } catch (error) {
      throw new Error(`Failed to find customers by name: ${error.message}`);
    }
  }

  /**
   * Get customers created within a date range
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {Promise<Customer[]>}
   */
  async findByDateRange(startDate, endDate) {
    try {
      const sequelizeModels = await CustomerModel.findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
        },
        order: [['createdAt', 'DESC']]
      });
      return sequelizeModels.map(model => this.#toDomainEntity(model));
    } catch (error) {
      throw new Error(`Failed to find customers by date range: ${error.message}`);
    }
  }

  /**
   * Get total count of customers
   * @returns {Promise<number>}
   */
  async count() {
    try {
      return await CustomerModel.count();
    } catch (error) {
      throw new Error(`Failed to count customers: ${error.message}`);
    }
  }
}
