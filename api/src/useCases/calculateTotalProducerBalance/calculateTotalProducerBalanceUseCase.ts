import Utilities from '../../utils';
import CustomError from '../../utils/customError';
import { CalculateTotalBalanceResponse } from '../../dtos/totalBalanceDTO';
import { Transaction, TransactionTypeNature } from '../../dtos/transactionDTO';
import { ICalculateTotalProducerBalanceDTO } from "./calculateTotalProducerBalanceDTO";
import { ISalesManagerRepository } from '../../repositories/salesManagerRepository/interfaces/ISalesManagerRepository';

export class CalculateTotalProducerBalanceUseCase {
    constructor(private salesManagerRepository: ISalesManagerRepository) { }

    private _calculateTotalProducerBalance(transactions: Transaction[]): CalculateTotalBalanceResponse[] {
        let balance = 0
        let producerName = ""

        for (const transaction of transactions) {
            const { value, type } = transaction;
            const { nature } = type;
            
            const valueNumber = Number(value);

            balance += (nature === TransactionTypeNature.entrada) ? valueNumber : -valueNumber;

            if (transaction.typeId === 1) {
                producerName = transaction.seller;
            }
        }

        const producer = [{
            seller: producerName,
            total: Math.max(balance, 0)
        }];

        return producer;
    }

    async execute(data: ICalculateTotalProducerBalanceDTO): Promise<CalculateTotalBalanceResponse[]> {
        const method = 'execute';
        try {
            const transactionsOfProducer = await this.salesManagerRepository.findProducerTransactions(data.product);

            return this._calculateTotalProducerBalance(transactionsOfProducer)
        } catch (error) {
            console.error({
                action: 'find-total-balance-producer-use-case',
                data: { error, params: data },
            });

            if (error instanceof CustomError) {
                throw error;
            }

            throw new CustomError(__filename, method, 'Unexpected error occurred', 500);
        }
    }
}