import fs from 'fs';
import { promisify } from 'util';
import Utilities from '../../utils';
import CustomError from '../../utils/customError';
import { EmptyFileError } from '../errors/EmptyFileError';
import { IUploadTransactionDTO } from './uploadTransactionsDTO';
import { UploadedFile, UploadedTransaction } from "../../dtos/uploadTransactionDTO";
import { ISalesManagerRepository } from '../../repositories/salesManagerRepository/interfaces/ISalesManagerRepository';


export class UploadTransactionsUseCase {
    constructor(private salesManagerRepository: ISalesManagerRepository) { }


    private _convertLinesToTransactions(lines: string[]): UploadedTransaction[] {

        // Format and store the data
        const transactions: UploadedTransaction[] = [];
        const transactionRegex = /^(\d+)\s+(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}-\d{2}:\d{2})\s+(.+?)\s+(\d+)\s+(.+)$/;

        for (const line of lines) {
            const match = line.match(transactionRegex);

            if (match) {
                const typeId = parseInt(match[1]);
                const date = new Date(match[2]);
                const product = match[3].trim();
                const value = String(match[4]);
                const seller = match[5].trim();


                const uploadedTransaction: UploadedTransaction = {
                    typeId,
                    date,
                    product,
                    value,
                    seller
                };

                transactions.push(uploadedTransaction);

            } else {
                console.warn({
                    message: "Invalid line",
                    data: line
                });
            }

        }

        return transactions
    }


    private async _loadFileContent(data: UploadedFile): Promise<string[]> {
        const method = "_loadFileContent";
        try {
            const { path } = data;

            const readFile = promisify(fs.readFile);

            // View file content
            const fileData = await readFile(path, 'utf-8');

            if (!Utilities.defined(fileData)) {
                console.error({
                    action: 'upload-transactions-use-case',
                    message: 'The file is empty or has no content',
                    data,
                });

                throw new EmptyFileError(__filename, method);
            }

            return fileData.split('\n');
        } catch (error) {
            throw error;
        }
    }

    async execute(data: IUploadTransactionDTO): Promise<void> {
        const method = 'execute';
        try {
            const { path } = data

            if (!Utilities.defined(data.path)) {
                throw new EmptyFileError(__filename, method)
            }

            const lines = await this._loadFileContent(data);
            const transactions = this._convertLinesToTransactions(lines);

            await this.salesManagerRepository.saveTransactions(transactions);

            // Remove file after processing
            fs.unlinkSync(path);

        } catch (error: any) {
            console.error({
                action: 'upload-transactions-use-case',
                data: { error, params: { data } },
            });

            if (error instanceof CustomError) {
                throw error;
            }

            throw new CustomError(__filename, method, 'An unexpected error occurred', 500);
        }
    }
}