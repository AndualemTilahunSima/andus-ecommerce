'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('customers', [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        address: '123 Main Street, New York, NY 10001',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@example.com',
        address: '456 Oak Avenue, Los Angeles, CA 90210',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        first_name: 'Bob',
        last_name: 'Johnson',
        email: 'bob.johnson@example.com',
        address: '789 Pine Road, Chicago, IL 60601',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customers', null, {});
  }
};
