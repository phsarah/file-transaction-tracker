import Faker from '../../config/CreateFake';
import { CalculateTotalBalanceResponse } from '../../dtos/totalBalanceDTO';
import { CalculateTotalAffiliateBalanceUseCase } from './calculateTotalAffiliateBalanceUseCase';
import { CalculateTotalAffiliateBalanceController } from './calculateTotalAffiliateBalanceController';

const fakeCalculateTotalAffiliateBalanceUseCase = Faker.create(CalculateTotalAffiliateBalanceUseCase);
const calculateTotalAffiliateBalanceController = new CalculateTotalAffiliateBalanceController(fakeCalculateTotalAffiliateBalanceUseCase);

beforeEach(() => {
    jest.resetAllMocks();
});

describe('Calculate Total Affiliate Balance Controller', () => {
    it('Should call next function if some error occurred', async () => {
        const { request, response } = Faker;

        request.query = {
            product: "CURSO DE PROGRAMAÇÃO"
        }

        const error = new Error('Some unexpected error occurred');
        fakeCalculateTotalAffiliateBalanceUseCase.execute = jest.fn(() => {
            throw error;
        });

        await calculateTotalAffiliateBalanceController.handle(request, response);

        expect(response.statusCode).toBe(500);
    });

    it('Should throw an error becaue we are missing mandatory params', async () => {
        const { request, response } = Faker;

        request.query = {}

        await calculateTotalAffiliateBalanceController.handle(request, response);

        expect(response.statusCode).toBe(422);
    });

    it('Should validate json response', async () => {
        const { request, response } = Faker;

        request.query = {
            product: "CURSO DE PROGRAMAÇÃO"
        }

        fakeCalculateTotalAffiliateBalanceUseCase.execute = jest.fn().mockReturnValue([
            {
                seller: "Ana Pereira",
                total: 79850
            }
        ]);

        const responseController = await calculateTotalAffiliateBalanceController.handle(request, response);

        expect(response.statusCode).toBe(200);
        expect(responseController).toMatchObject({
            message: expect.any(String),
            data: expect.any(Array<CalculateTotalBalanceResponse>)
        });
    });
});