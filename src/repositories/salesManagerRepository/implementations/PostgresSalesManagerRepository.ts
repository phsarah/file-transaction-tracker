import { prisma } from '../../../config/PrismaClient';
import { Transaction } from '../../../dtos/transactionDTO';
import { UploadedTransaction } from '../../../dtos/uploadTransactionDTO';
import { ISalesManagerRepository } from '../interfaces/ISalesManagerRepository';
import { PostgresInvalidRequestError } from '../errors/PostgresInvalidRequestError';

export class PostgresSalesManagerRepository implements ISalesManagerRepository {

    async findAllTransactions(): Promise<Transaction[]> {
        const method = "findAllTransactions"
        try {
            return await prisma.transaction.findMany({
                include: {
                    type: true
                }
            }) as Transaction[]
        } catch (error) {
            console.error(error)
            throw new PostgresInvalidRequestError(__filename, method);
        }
    }

    async findProducerTransactions(product: string): Promise<Transaction[]> {
        const method = "findProducerTransactions"
        try {
            return await prisma.transaction.findMany({
                where: {
                    product, typeId: {
                        in: [1, 2, 3]
                    }
                },
                include: {
                    type: true
                }
            }) as Transaction[];
        } catch (error) {
            console.error(error)
            throw new PostgresInvalidRequestError(__filename, method);
        }
    }

    async findAffiliatedTransactions(product: string): Promise<Transaction[]> {
        const method = "findAffiliatedTransactions"
        try {
            return await prisma.transaction.findMany({
                where: {
                    product, typeId: {
                        in: [4]
                    }
                },
                include: {
                    type: true
                }
            }) as Transaction[];
        } catch (error) {
            console.error(error)
            throw new PostgresInvalidRequestError(__filename, method);
        }
    }

    async saveTransactions(transactions: UploadedTransaction[]): Promise<void> {
        const method = "saveTransactions"
        try {
            await prisma.transaction.createMany({
                data: transactions,
            });

        } catch (error) {
            console.error(error)
            throw new PostgresInvalidRequestError(__filename, method);
        }
    }
}
