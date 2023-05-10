import Faker from '../../config/CreateFake';
import { CalculateTotalBalanceResponse } from '../dtos/calculateTotalBalanceDTO';
import { FindTotalBalanceAffiliatedUseCase } from './findTotalBalanceAffiliatedUseCase';
import { FindTotalBalanceAffiliatedController } from './findTotalBalanceAffiliatedController';

const fakeFindTotalBalanceAffiliatedUseCase = Faker.create(FindTotalBalanceAffiliatedUseCase);
const findTotalBalanceAffiliatedController = new FindTotalBalanceAffiliatedController(fakeFindTotalBalanceAffiliatedUseCase);

beforeEach(() => {
    jest.resetAllMocks();
});

describe('find total balance affiliated controller', () => {
    it('Should call next function if some error occurred', async () => {
        const { request, response } = Faker;

        request.query = {
            product: "CURSO DE PROGRAMAÇÃO"
        }

        const error = new Error('Some unexpected error occurred');
        fakeFindTotalBalanceAffiliatedUseCase.execute = jest.fn(() => {
            throw error;
        });

        await findTotalBalanceAffiliatedController.handle(request, response);

        expect(response.statusCode).toBe(500);
    });

    it('Should throw an error becaue we are missing mandatory params', async () => {
        const { request, response } = Faker;

        request.query = {}

        await findTotalBalanceAffiliatedController.handle(request, response);

        console.log(response)

        expect(response.statusCode).toBe(409);

    });

    it('Should validate json response', async () => {
        const { request, response } = Faker;

        request.query = {
            product: "CURSO DE PROGRAMAÇÃO"
        }

        fakeFindTotalBalanceAffiliatedUseCase.execute = jest.fn().mockReturnValue([
            {
                seller: "Ana Pereira",
                total: 79850
            }
        ]);

        const responseController = await findTotalBalanceAffiliatedController.handle(request, response);
        console.log(responseController)
        expect(response.statusCode).toBe(200);
        expect(responseController).toMatchObject({
            message: expect.any(String),
            data: expect.any(Array<CalculateTotalBalanceResponse>)
        });
    });
});