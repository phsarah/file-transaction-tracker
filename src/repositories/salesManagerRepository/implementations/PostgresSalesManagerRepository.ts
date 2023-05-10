import { prisma } from '../../../config/PrismaClient';
import { Transaction } from '../dtos/transactionDTO';
import { PostgresInvalidRequestError } from '../errors/PostgresInvalidRequestError';
import { ISalesManagerRepository } from '../interfaces/ISalesManagerRepository';

export class PostgresSalesManagerRepository implements ISalesManagerRepository {

    async saveTransaction(data: any): Promise<any> {
    }

    async findAllTransactions(): Promise<Transaction[]> {
        const method = "findAllTransactions"
        try {
            return await prisma.transaction.findMany({
                include: {
                    type: true
                }
            }) as Transaction[]
        } catch (error) {
            throw new PostgresInvalidRequestError(__filename, method);
        }
    }

    async findProducerTransactions(product: string): Promise<Transaction[]> {
        const method = "findProducerTransactions"
        try {
            return await prisma.transaction.findMany({
                where: {
                    product, typeId: {
                        in: [1, 3]
                    }
                },
                include: {
                    type: true
                }
            }) as Transaction[];
        } catch (error) {
            throw new PostgresInvalidRequestError(__filename, method);
        }
    }

    async findAffiliatedTransactions(product: string): Promise<Transaction[]> {
        const method = "findAffiliatedTransactions"
        try {
            return await prisma.transaction.findMany({
                where: {
                    product, typeId: {
                        in: [2, 4]
                    }
                },
                include: {
                    type: true
                }
            }) as Transaction[];
        } catch (error) {
            throw new PostgresInvalidRequestError(__filename, method);
        }
    }
}
