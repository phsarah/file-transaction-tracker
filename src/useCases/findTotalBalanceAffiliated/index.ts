import { PostgresSalesManagerRepository } from '../../repositories/salesManagerRepository/implementations/PostgresSalesManagerRepository';
import { FindTotalBalanceAffiliatedUseCase } from './findTotalBalanceAffiliatedUseCase';
import { FindTotalBalanceAffiliatedController } from './findTotalBalanceAffiliatedController';

const salesManagerRepository = new PostgresSalesManagerRepository();
const findTotalBalanceAffiliatedCUseCase = new FindTotalBalanceAffiliatedUseCase(salesManagerRepository);
const findTotalBalanceAffiliatedController = new FindTotalBalanceAffiliatedController(findTotalBalanceAffiliatedCUseCase);

export { findTotalBalanceAffiliatedController, findTotalBalanceAffiliatedCUseCase };