import { PostgresSalesManagerRepository } from '../../repositories/salesManagerRepository/implementations/PostgresSalesManagerRepository';
import { CalculateTotalProducerBalanceController } from './calculateTotalProducerBalanceController';
import { CalculateTotalProducerBalanceUseCase } from './calculateTotalProducerBalanceUseCase';

const salesManagerRepository = new PostgresSalesManagerRepository();

const calculateTotalProducerBalanceUseCase = new CalculateTotalProducerBalanceUseCase(salesManagerRepository);
const calculateTotalProducerBalanceController = new CalculateTotalProducerBalanceController(calculateTotalProducerBalanceUseCase);

export { calculateTotalProducerBalanceController, calculateTotalProducerBalanceUseCase };