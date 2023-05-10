import { Router } from 'express';
import { findAllTransactionsController } from './useCases/findAllTransactions';


const router = Router();

router.get(
    '/transaction',
    (request, response) => findAllTransactionsController.handle(request, response),
);


export { router };