import { PostgresSalesManagerRepository } from '../../repositories/salesManagerRepository/implementations/PostgresSalesManagerRepository';
import { FindAllTransactionsController } from './findAllTransactionsController';
import { FindAllTransactionsUseCase } from './findAllTransactionsUseCase';

const salesManagerRepository = new PostgresSalesManagerRepository();

const findAllTransactionsUseCase = new FindAllTransactionsUseCase(salesManagerRepository);
const findAllTransactionsController = new FindAllTransactionsController(findAllTransactionsUseCase);

export { findAllTransactionsController, findAllTransactionsUseCase };