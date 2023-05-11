import CustomError from '../../utils/customError';
import { Transaction, TransactionType } from '../../dtos/transactionDTO';
import { ISalesManagerRepository } from '../../repositories/salesManagerRepository/interfaces/ISalesManagerRepository';

export class FindAllTransactionsUseCase {
    constructor(private salesManagerRepository: ISalesManagerRepository) { }

    // Format and map transactions data
    private _formatAndMapTransactions(transactions: Transaction[]): Transaction[] {
        return transactions.map((transaction) => {
            transaction.type = new TransactionType(transaction.type);

            return new Transaction(transaction);
        });
    }

    async execute(): Promise<Transaction[]> {
        const method = 'execute'
        try {
            const allTransactions = await this.salesManagerRepository.findAllTransactions();

            return this._formatAndMapTransactions(allTransactions)
        } catch (error) {
            console.error({
                action: 'find-all-transactions-use-case',
                data: { error },
            });

            if (error instanceof CustomError) {
                throw error;
            }

            throw new CustomError(__filename, method, 'Unexpected error occurred', 500);
        }
    }
}