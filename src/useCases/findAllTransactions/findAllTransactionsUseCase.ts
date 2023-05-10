import CustomError from '../../utils/customError';
import { Transaction } from '../../repositories/salesManagerRepository/dtos/transactionDTO';
import { TransactionType } from '../../repositories/salesManagerRepository/dtos/transactionTypeDTO';
import { ISalesManagerRepository } from '../../repositories/salesManagerRepository/interfaces/ISalesManagerRepository';

export class FindAllTransactionsUseCase {
    constructor(private salesManagerRepository: ISalesManagerRepository) { }

    // Here we are keeping only the necessary fields to be sent    
    private _formatTransactions(transactions: Transaction[]): Transaction[] {
        return transactions.map((transaction) => {
            transaction.type = new TransactionType(transaction.type)

            return new Transaction(transaction);
        })
    }

    async execute(): Promise<Transaction[]> {
        const method = 'execute'
        try {
            const allTransactions = await this.salesManagerRepository.findAllTransactions();
            return this._formatTransactions(allTransactions)
            
        } catch (error) {
            console.error({
                action: 'find-all-transactions-use-case',
                data: { error },
            });

            if (error instanceof CustomError) {
                throw error;
            }

            throw new CustomError(__filename, method, 'unexpected error occurred', 409, 999999);
        }
    }
}