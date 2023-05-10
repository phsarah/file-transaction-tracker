import Faker from '../../config/CreateFake';
import { CalculateTotalBalanceResponse } from '../dtos/calculateTotalBalanceDTO';
import { FindTotalBalanceProducerUseCase } from './findTotalBalanceProducerUseCase';
import { FindTotalBalanceProducerController } from './findTotalBalanceProducerController';

const fakeFindTotalBalanceProducerUseCase = Faker.create(FindTotalBalanceProducerUseCase);
const findTotalBalanceProducerController = new FindTotalBalanceProducerController(fakeFindTotalBalanceProducerUseCase);

beforeEach(() => {
    jest.resetAllMocks();
});

describe('find total balance producer controller', () => {
    it('Should call next function if some error occurred', async () => {
        const { request, response } = Faker;

        request.query = {
            product: "CURSO DE PROGRAMAÇÃO"
        }

        const error = new Error('Some unexpected error occurred');
        fakeFindTotalBalanceProducerUseCase.execute = jest.fn(() => {
            throw error;
        });

        await findTotalBalanceProducerController.handle(request, response);

        expect(response.statusCode).toBe(500);
    });

    it('Should throw an error becaue we are missing mandatory params', async () => {
        const { request, response } = Faker;

        request.query = {}
        
        await findTotalBalanceProducerController.handle(request, response);

        console.log(response)

        expect(response.statusCode).toBe(409);

    });

    it('Should validate json response', async () => {
        const { request, response } = Faker;

        request.query = {
            product: "CURSO DE PROGRAMAÇÃO"
        }

        fakeFindTotalBalanceProducerUseCase.execute = jest.fn().mockReturnValue([
            {
                seller: "ANA PEREIRA",
                total: 79850
            }
        ]);

        const responseController = await findTotalBalanceProducerController.handle(request, response);
        console.log(responseController)
        expect(response.statusCode).toBe(200);
        expect(responseController).toMatchObject({
            message: expect.any(String),
            data: expect.any(Array<CalculateTotalBalanceResponse>)
        });
    });
});