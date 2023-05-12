import Utilities from '../../utils';
import {
    ICalculateTotalAffiliateBalanceDTO
} from "./calculateTotalAffiliateBalanceDTO";
import CustomError from '../../utils/customError';
import { CalculateTotalBalanceResponse } from '../../dtos/totalBalanceDTO';
import { Transaction, TransactionTypeNature } from '../../dtos/transactionDTO';
import { ISalesManagerRepository } from '../../repositories/salesManagerRepository/interfaces/ISalesManagerRepository';

export class CalculateTotalAffiliateBalanceUseCase {
    constructor(private salesManagerRepository: ISalesManagerRepository) { }


    private _calculateTotalAllAffiliatedBalance(transactions: { [key: string]: Transaction[] }): CalculateTotalBalanceResponse[] {

        const affiliatedList = Object.entries(transactions).map(([seller, objects]) => {
            let balance = 0;

            for (const obj of objects) {
                const { type, value } = obj;
                const { nature } = type;

                const valueNumber = Number(value);

                if (nature === TransactionTypeNature.entrada) {
                    balance += valueNumber
                }
            }

            return { seller, total: balance };
        });

        return affiliatedList
    }


    async execute(data: ICalculateTotalAffiliateBalanceDTO): Promise<CalculateTotalBalanceResponse[]> {
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

            return this._calculateTotalAllAffiliatedBalance(transactionsOfAffiliatedGroupBy)

        } catch (error) {
            console.error({
                action: 'find-total-balance-affiliated-use-case',
                data: { error, params: data },
            });

            if (error instanceof CustomError) {
                throw error;
            }

            throw new CustomError(__filename, method, 'Unexpected error occurred', 500);
        }
    }
}