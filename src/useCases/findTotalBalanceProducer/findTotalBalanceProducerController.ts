import { Request, Response } from 'express';
import { FindTotalBalanceProducerUseCase } from './findTotalBalanceProducerUseCase';

export class FindTransactionProducerController {
    constructor(private findTotalBalanceProducerUseCase: FindTotalBalanceProducerUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { product } = request.query;

            const data = await this.findTotalBalanceProducerUseCase.execute({
                product: String(product)
            });

            return response.status(200).send({ message: "This is the producer total balance", data });
        } catch (error: any) {
            return response.status(error.httpStatusCode || 500).json(error);
        }
    }
}