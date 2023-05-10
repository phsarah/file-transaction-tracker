import Utilities from '../../utils';
import {
    IFindTotalBalanceAffiliatedUseCaseDTO
} from "./findTotalBalanceAffiliatedDTO";
import CustomError from '../../utils/customError';
import { CalculateTotalBalanceResponse } from '../dtos/calculateTotalBalanceDTO';
import { Transaction } from '../../repositories/salesManagerRepository/dtos/transactionDTO';
import { TransactionTypeNature } from '../../repositories/salesManagerRepository/dtos/transactionTypeDTO';
import { ISalesManagerRepository } from '../../repositories/salesManagerRepository/interfaces/ISalesManagerRepository';

export class FindTotalBalanceAffiliatedUseCase {
    constructor(private salesManagerRepository: ISalesManagerRepository) { }


    private _calculateTotalAllAffiliatedBalance(transactions: { [key: string]: Transaction[] }): CalculateTotalBalanceResponse[] {

        const affiliatedList = Object.entries(transactions).map(([name, objects]) => {
            let balance = 0;
            for (const obj of objects) {
                const natureType = obj.type.nature;
                const value = Number(obj.value);

                if (natureType === TransactionTypeNature.entrada) {
                    balance += value
                } else if (natureType === TransactionTypeNature.saida) {
                    balance -= value
                }
            }

            return { seller: name, total: balance };
        });

        return affiliatedList
    }


    async execute(data: IFindTotalBalanceAffiliatedUseCaseDTO): Promise<CalculateTotalBalanceResponse[]> {
        const method = 'execute';
        try {

            const transactionsOfAffiliated = await this.salesManagerRepository.findAffiliatedTransactions(data.product);

            if (!Utilities.defined(transactionsOfAffiliated)) {
                console.info({
                    action: 'find-total-balance-affiliated-use-case',
                    message: 'Transactions of affiliated not found',
                    data,
                });

                return []
            }

            const transactionsOfAffiliatedGroupBy = Utilities.groupBy(transactionsOfAffiliated, 'seller')

            console.log(transactionsOfAffiliatedGroupBy)
            return this._calculateTotalAllAffiliatedBalance(transactionsOfAffiliatedGroupBy)

        } catch (error) {
            console.error({
                action: 'find-total-balance-affiliated-use-case',
                data: { error, params: data },
            });

            if (error instanceof CustomError) {
                throw error;
            }

            throw new CustomError(__filename, method, 'unexpected error occurred', 409, 999999);
        }
    }
}