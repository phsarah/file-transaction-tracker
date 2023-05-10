import { Transaction } from "../dtos/transactionDTO";

export interface ISalesManagerRepository {
    findAllTransactions(): Promise<Transaction[]>;
    saveTransaction(body: any): Promise<any>;
    findProducerTransactions(product: string): Promise<Transaction[]>;
    findAffiliatedTransactions(product: string): Promise<Transaction[]>;
}