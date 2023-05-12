import { PostgresSalesManagerRepository } from '../../repositories/salesManagerRepository/implementations/PostgresSalesManagerRepository';
import { CalculateTotalAffiliateBalanceUseCase } from './calculateTotalAffiliateBalanceUseCase';
import { CalculateTotalAffiliateBalanceController } from './calculateTotalAffiliateBalanceController';

const salesManagerRepository = new PostgresSalesManagerRepository();
const calculateTotalAffiliateBalanceUseCase = new CalculateTotalAffiliateBalanceUseCase(salesManagerRepository);
const calculateTotalAffiliateBalanceController = new CalculateTotalAffiliateBalanceController(calculateTotalAffiliateBalanceUseCase);

export { calculateTotalAffiliateBalanceController, calculateTotalAffiliateBalanceUseCase };