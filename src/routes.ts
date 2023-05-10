import { Router } from 'express';
import { findAllTransactionsController } from './useCases/findAllTransactions';
import { findTotalBalanceProducerController } from './useCases/findTotalBalanceProducer';
import { findTotalBalanceAffiliatedController } from './useCases/findTotalBalanceAffiliated';


const router = Router();

router.get(
    '/transaction',
    (request, response) => findAllTransactionsController.handle(request, response),
);

router.get(
    '/transaction/producer/total-balance',
    (request, response) => findTotalBalanceProducerController.handle(request, response),
);

router.get(
    '/transaction/affiliated/total-balance',
    (request, response) => findTotalBalanceAffiliatedController.handle(request, response),
);

export { router };