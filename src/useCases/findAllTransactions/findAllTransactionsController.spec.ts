import Faker from '../../config/CreateFake';
import { FindAllTransactionsUseCase } from './findAllTransactionsUseCase';
import { FindAllTransactionsController } from './findAllTransactionsController';
import { Transaction } from '../../repositories/salesManagerRepository/dtos/transactionDTO';

const fakeFindAllTransactionsUseCase = Faker.create(FindAllTransactionsUseCase);
const findAllTransactionsController = new FindAllTransactionsController(fakeFindAllTransactionsUseCase);

beforeEach(() => {
    jest.resetAllMocks();
});

describe('Find All Transactions Controller', () => {
    it('Should call next function if some error occurred', async () => {
        const { request, response } = Faker;

        const error = new Error('Some unexpected error occurred');
        fakeFindAllTransactionsUseCase.execute = jest.fn(() => {
            throw error;
        });

        await findAllTransactionsController.handle(request, response);

        expect(response.statusCode).toBe(500);
    });

    it('Should validate json response', async () => {
        const { request, response } = Faker;


        fakeFindAllTransactionsUseCase.execute = jest.fn().mockReturnValue([
            {
                "id": 1,
                "typeId": 1,
                "date": "1970-01-01T00:00:00.000Z",
                "product": "CURSO DE BEM-ESTAR",
                "value": "0000012750",
                "seller": "JOSE CARLOS",
                "createdAt": "2023-05-08T18:09:17.444Z",
                "updatedAt": "2023-05-08T18:08:25.416Z",
                "type": {
                    "id": 1,
                    "description": "Venda produtor",
                    "nature": "Entrada",
                    "signal": "+",
                    "createdAt": "2023-05-08T17:57:03.438Z",
                    "updatedAt": "2023-05-08T17:56:40.542Z"
                }
            },
            {
                "id": 2,
                "typeId": 3,
                "date": "1970-01-01T00:00:00.000Z",
                "product": "CURSO DE BEM-ESTAR",
                "value": "0000004500",
                "seller": "JOSE CARLOS",
                "createdAt": "2023-05-08T18:37:10.291Z",
                "updatedAt": "2023-05-08T18:36:52.365Z",
                "type": {
                    "id": 3,
                    "description": "Comissão paga",
                    "nature": "Saída",
                    "signal": "-",
                    "createdAt": "2023-05-08T17:57:41.180Z",
                    "updatedAt": "2023-05-08T17:58:24.482Z"
                }
            },
        ]);

        const responseController = await findAllTransactionsController.handle(request, response);

        expect(response.statusCode).toBe(200);
        expect(responseController).toMatchObject({
            message: expect.any(String),
            data: expect.any(Array<Transaction>)
        });
    });
});