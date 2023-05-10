import { Request, Response } from 'express';
import { FindAllTransactionsUseCase } from './findAllTransactionsUseCase';

export class FindAllTransactionsController {
    constructor(private findAllTransactionsUseCase: FindAllTransactionsUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const data = await this.findAllTransactionsUseCase.execute();

            return response.status(200).json({ message: 'Transactions list found!', data });
        } catch (error: any) {
            return response.status(error.httpStatusCode || 500).json(error);
        }
    }
}