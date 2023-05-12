import multer from 'multer';
import { Router } from 'express';
import { uploadTransactionsController } from './useCases/uploadTransactions';
import { findAllTransactionsController } from './useCases/findAllTransactions';
import { calculateTotalProducerBalanceController } from './useCases/calculateTotalProducerBalance';
import { calculateTotalAffiliateBalanceController } from './useCases/calculateTotalAffiliateBalance';


const router = Router();

const upload = multer({ dest: 'uploads/' });

router.post(
    '/transactions/upload',
    upload.single('file'),
    (request, response) => uploadTransactionsController.handle(request, response),
);

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