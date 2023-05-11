import Faker from '../../config/CreateFake';
import { CalculateTotalBalanceResponse } from '../../dtos/totalBalanceDTO';
import { CalculateTotalProducerBalanceUseCase } from './calculateTotalProducerBalanceUseCase';
import { CalculateTotalProducerBalanceController } from './calculateTotalProducerBalanceController';

const fakeCalculateTotalProducerBalanceUseCase = Faker.create(CalculateTotalProducerBalanceUseCase);
const calculateTotalProducerBalanceController = new CalculateTotalProducerBalanceController(fakeCalculateTotalProducerBalanceUseCase);

beforeEach(() => {
    jest.resetAllMocks();
});

describe('Calculate Total Producer Balance Controller', () => {
    it('Should call next function if some error occurred', async () => {
        const { request, response } = Faker;

        request.query = {
            product: "CURSO DE PROGRAMAÇÃO"
        }

        const error = new Error('Some unexpected error occurred');
        fakeCalculateTotalProducerBalanceUseCase.execute = jest.fn(() => {
            throw error;
        });

        await calculateTotalProducerBalanceController.handle(request, response);

        expect(response.statusCode).toBe(500);
    });

    it('Should throw an error becaue we are missing mandatory params', async () => {
        const { request, response } = Faker;

        request.query = {}

        await calculateTotalProducerBalanceController.handle(request, response);

        expect(response.statusCode).toBe(422);

    });

    it('Should validate json response', async () => {
        const { request, response } = Faker;

        request.query = {
            product: "CURSO DE PROGRAMAÇÃO"
        }

        fakeCalculateTotalProducerBalanceUseCase.execute = jest.fn().mockReturnValue([
            {
                seller: "ANA PEREIRA",
                total: 79850
            }
        ]);

        const responseController = await calculateTotalProducerBalanceController.handle(request, response);
        console.log(responseController)
        expect(response.statusCode).toBe(200);
        expect(responseController).toMatchObject({
            message: expect.any(String),
            data: expect.any(Array<CalculateTotalBalanceResponse>)
        });
    });
});