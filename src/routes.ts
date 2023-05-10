import { Router } from 'express';
import { findAllTransactionsController } from './useCases/findAllTransactions';
import { findTotalBalanceProducerController } from './useCases/findTotalBalanceProducer';


const router = Router();

router.get(
    '/transaction',
    (request, response) => findAllTransactionsController.handle(request, response),
);


router.get(
    '/transaction/producer/total-balance',
    (request, response) => findTotalBalanceProducerController.handle(request, response),
);

export { router };