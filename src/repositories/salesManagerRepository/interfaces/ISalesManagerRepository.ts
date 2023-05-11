import { UploadedTransaction } from "../../../dtos/uploadTransactionDTO"
import { Transaction } from "../../../dtos/transactionDTO";

export interface ISalesManagerRepository {
    findAllTransactions(): Promise<Transaction[]>;
    findProducerTransactions(product: string): Promise<Transaction[]>;
    findAffiliatedTransactions(product: string): Promise<Transaction[]>;
    saveTransactions(data: UploadedTransaction[]): Promise<void>;

}