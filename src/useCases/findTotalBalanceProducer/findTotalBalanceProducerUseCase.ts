import Utilities from '../../utils';
import CustomError from '../../utils/customError';
import { IFindTotalBalanceProducerDTO } from "./findTotalBalanceProducerDTO";
import { CalculateTotalBalanceResponse } from '../dtos/calculateTotalBalanceDTO';
import { Transaction } from '../../repositories/salesManagerRepository/dtos/transactionDTO';
import { TransactionTypeNature } from '../../repositories/salesManagerRepository/dtos/transactionTypeDTO';
import { ISalesManagerRepository } from '../../repositories/salesManagerRepository/interfaces/ISalesManagerRepository';

export class FindTotalBalanceProducerUseCase {
    constructor(private salesManagerRepository: ISalesManagerRepository) { }

    private _calculateTotalProducerBalance(transactions: Transaction[]): CalculateTotalBalanceResponse[] {
        const producer = []
        let balance = 0

        for (let i = 0; i < transactions.length; i++) {
            const value = Number(transactions[i].value)
            const natureType = transactions[i].type.nature

            if (natureType === TransactionTypeNature.entrada) {
                balance += value
            } else if (natureType === TransactionTypeNature.saida) {
                balance -= value
            }
        }

        producer.push({
            seller: transactions[0].seller,
            total: balance
        })

        return producer;
    }

    async execute(data: IFindTotalBalanceProducerDTO): Promise<CalculateTotalBalanceResponse[]> {
        const method = 'execute';
        try {
            const transactionsOfProducer = await this.salesManagerRepository.findProducerTransactions(data.product);

            if (!Utilities.defined(transactionsOfProducer)) {
                console.info({
                    action: 'find-total-balance-producer-use-case',
                    message: 'Transactions of producer not found',
                    data,
                });

                return []
            }

            return this._calculateTotalProducerBalance(transactionsOfProducer)
        } catch (error) {
            console.error({
                action: 'find-total-balance-producer-use-case',
                data: { error, params: data },
            });

            if (error instanceof CustomError) {
                throw error;
            }

            throw new CustomError(__filename, method, 'unexpected error occurred', 409, 999999);
        }
    }
}