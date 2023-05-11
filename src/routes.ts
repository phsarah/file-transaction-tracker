import { Router } from 'express';
import { findAllTransactionsController } from './useCases/findAllTransactions';
import { calculateTotalProducerBalanceController } from './useCases/calculateTotalProducerBalance';
import { calculateTotalAffiliateBalanceController } from './useCases/calculateTotalAffiliateBalance';


const router = Router();

router.get(
    '/transactions',
    (request, response) => findAllTransactionsController.handle(request, response),
);

router.get(
    '/transactions/producer/total-balance',
    (request, response) => calculateTotalProducerBalanceController.handle(request, response),
);

router.get(
    '/transactions/affiliated/total-balance',
    (request, response) => calculateTotalAffiliateBalanceController.handle(request, response),
);

export { router };