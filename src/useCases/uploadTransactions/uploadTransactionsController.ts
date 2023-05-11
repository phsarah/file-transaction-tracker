import { Request, Response } from 'express';
import { UploadedFile } from '../../dtos/uploadTransactionDTO';
import { FileNotFoundError } from '../errors/FileNotFoundError';
import { UploadTransactionsUseCase } from './uploadTransactionsUseCase';

import Utilities from '../../utils';


export class UploadTransactionsController {
    constructor(private uploadTransactionsUseCase: UploadTransactionsUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {

            const file = request.file as UploadedFile;

            if (!Utilities.defined(file)) {
                throw new FileNotFoundError(__filename, 'handle')
            }

            await this.uploadTransactionsUseCase.execute(file);

            return response.status(200).json({ message: 'Upload completed successfully!' });
        } catch (error: any) {
            return response.status(error.httpStatusCode || 500).json(error);
        }
    }
}