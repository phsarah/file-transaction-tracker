import { PostgresSalesManagerRepository } from '../../repositories/salesManagerRepository/implementations/PostgresSalesManagerRepository';
import { UploadTransactionsController } from './uploadTransactionsController';
import { UploadTransactionsUseCase } from './uploadTransactionsUseCase';

const salesManagerRepository = new PostgresSalesManagerRepository();
const uploadTransactionsUseCase = new UploadTransactionsUseCase(salesManagerRepository);
const uploadTransactionsController = new UploadTransactionsController(uploadTransactionsUseCase);

export { uploadTransactionsController, uploadTransactionsUseCase };