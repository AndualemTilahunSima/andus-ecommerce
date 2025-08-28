import { Router } from 'express';
import { createCustomerHandler, getAllCustomersHandler } from './controller/customer-controller.js';
const router = Router();

router.post('/', createCustomerHandler);

router.get('/', getAllCustomersHandler);

export default router;
