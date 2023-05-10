import { PostgresSalesManagerRepository } from '../../repositories/salesManagerRepository/implementations/PostgresSalesManagerRepository';
import { FindTransactionProducerController } from './findTotalBalanceProducerController';
import { FindTotalBalanceProducerUseCase } from './findTotalBalanceProducerUseCase';

const salesManagerRepository = new PostgresSalesManagerRepository();

const findTotalBalanceProducerUseCase = new FindTotalBalanceProducerUseCase(salesManagerRepository);
const findTotalBalanceProducerController = new FindTransactionProducerController(findTotalBalanceProducerUseCase);

export { findTotalBalanceProducerController, findTotalBalanceProducerUseCase };