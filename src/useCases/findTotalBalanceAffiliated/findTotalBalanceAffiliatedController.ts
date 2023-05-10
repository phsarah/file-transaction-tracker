import { FindTotalBalanceAffiliatedUseCase } from './findTotalBalanceAffiliatedUseCase';
import { Request, Response } from 'express';
import Utilities from '../../utils';


export class FindTotalBalanceAffiliatedController {
    constructor(private findTotalBalanceAffiliatedUseCase: FindTotalBalanceAffiliatedUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            await Utilities.validateParams(['product'], request.query)
            const { product } = request.query

            const data = await this.findTotalBalanceAffiliatedUseCase.execute({ product: String(product) });

            return response.status(200).json({ message: "This is the total affiliate balance", data });
        } catch (error: any) {
            return response.status(error.httpStatusCode || 500).json(error);
        }
    }
}