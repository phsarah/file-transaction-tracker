import Utilities from '../../utils';
import { Request, Response } from 'express';
import { CalculateTotalProducerBalanceUseCase } from './calculateTotalProducerBalanceUseCase';

export class CalculateTotalProducerBalanceController {
    constructor(private findTotalBalanceProducerUseCase: CalculateTotalProducerBalanceUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {

            await Utilities.validateParams(['product'], request.query)
            const { product } = request.query;

            const data = await this.findTotalBalanceProducerUseCase.execute({
                product: String(product)
            });

            return response.status(200).json({ message: "This is the producer total balance", data });
        } catch (error: any) {
            return response.status(error.httpStatusCode || 500).json(error);
        }
    }
}