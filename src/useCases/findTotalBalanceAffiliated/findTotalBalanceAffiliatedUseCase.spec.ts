import Faker from '../../config/CreateFake';
import CustomError from '../../utils/customError';
import { FindTotalBalanceAffiliatedUseCase } from './findTotalBalanceAffiliatedUseCase';
import { ISalesManagerRepository } from '../../repositories/salesManagerRepository/interfaces/ISalesManagerRepository';
import { PostgresInvalidRequestError } from '../../repositories/salesManagerRepository/errors/PostgresInvalidRequestError';
import { PostgresSalesManagerRepository } from '../../repositories/salesManagerRepository/implementations/PostgresSalesManagerRepository';

const fakeSalesManagerProvider: ISalesManagerRepository = Faker.create(PostgresSalesManagerRepository);

const findTotalBalanceAffiliatedUseCase = new FindTotalBalanceAffiliatedUseCase(fakeSalesManagerProvider);

beforeEach(() => {
    jest.resetAllMocks();
});


describe('find total balance affiliated use case', () => {
    it('Should return total affiliated balance by product', async () => {
        fakeSalesManagerProvider.findAffiliatedTransactions = jest.fn().mockReturnValue([
            {
                "id": 1,
                "typeId": 2,
                "date": "1970-01-01T00:00:00.000Z",
                "product": "CURSO DE BEM-ESTAR",
                "value": "0000012750",
                "seller": "AMANDA NOGUEIRA",
                "createdAt": "2023-05-08T18:09:17.444Z",
                "updatedAt": "2023-05-08T18:08:25.416Z",
                "type": {
                    "id": 1,
                    "description": "Venda filiado",
                    "nature": "Entrada",
                    "signal": "+",
                    "createdAt": "2023-05-08T17:57:03.438Z",
                    "updatedAt": "2023-05-08T17:56:40.542Z"
                }
            },
            {
                "id": 4,
                "typeId": 4,
                "date": "1970-01-01T00:00:00.000Z",
                "product": "CURSO DE BEM-ESTAR",
                "value": "0000004500",
                "seller": "FERNANDO ALENCAR",
                "createdAt": "2023-05-09T01:05:13.962Z",
                "updatedAt": "2023-05-09T01:04:51.682Z",
                "type": {
                    "id": 3,
                    "description": "Comissão recebida",
                    "nature": "Entrada",
                    "signal": "+",
                    "createdAt": "2023-05-08T17:57:58.803Z",
                    "updatedAt": "2023-05-08T17:57:42.781Z"
                }
            },
        ]);

        const responseUseCase = await findTotalBalanceAffiliatedUseCase.execute({
            product: "CURSO DE BEM-ESTAR"
        });

        expect(responseUseCase.length).toEqual(2);
        expect(responseUseCase[0]).toMatchObject({
            seller: expect.any(String),
            total: expect.any(Number),
        });

    });

    it('Should throw an unexpected error', async () => {
        fakeSalesManagerProvider.findAffiliatedTransactions = jest.fn(() => {
            throw new Error('Some unexpected error occurred');
        });

        expect(findTotalBalanceAffiliatedUseCase.execute({
            product: "CURSO DE BEM-ESTAR"
        })).rejects.toThrow(CustomError);
    });

    it('Should throw an postgres invalid request error', async () => {
        fakeSalesManagerProvider.findAffiliatedTransactions = jest.fn(() => {
            throw new PostgresInvalidRequestError(__filename, 'test');
        });

        expect(findTotalBalanceAffiliatedUseCase.execute({ product: "CURSO DE BEM-ESTAR" })).rejects.toThrow(
            PostgresInvalidRequestError,
        );
    });
});