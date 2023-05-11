import Faker from '../../config/CreateFake';
import CustomError from '../../utils/customError';
import { TransactionType } from '../../dtos/transactionDTO';
import { FindAllTransactionsUseCase } from './findAllTransactionsUseCase';
import { ISalesManagerRepository } from '../../repositories/salesManagerRepository/interfaces/ISalesManagerRepository';
import { PostgresSalesManagerRepository } from '../../repositories/salesManagerRepository/implementations/PostgresSalesManagerRepository';
import { PostgresInvalidRequestError } from '../../repositories/salesManagerRepository/errors/PostgresInvalidRequestError';

const fakeSalesManagerProvider: ISalesManagerRepository = Faker.create(PostgresSalesManagerRepository);
const findAllTransactionsUseCase = new FindAllTransactionsUseCase(fakeSalesManagerProvider);

beforeEach(() => {
    jest.resetAllMocks();
});


describe('Find All Transaction Use Case', () => {
    it('Should create a card', async () => {
        fakeSalesManagerProvider.findAllTransactions = jest.fn().mockReturnValue([
            {
                id: 1,
                typeId: 1,
                date: "1970-01-01T00:00:00.000Z",
                product: "CURSO DE BEM-ESTAR",
                value: "0000012750",
                seller: "JOSE CARLOS",
                createdAt: "2023-05-08T18:09:17.444Z",
                updatedAt: "2023-05-08T18:08:25.416Z",
                type: {
                    id: 1,
                    description: "Venda produtor",
                    nature: "Entrada",
                    signal: "+",
                    createdAt: "2023-05-08T17:57:03.438Z",
                    updatedAt: "2023-05-08T17:56:40.542Z"
                }
            },
            {
                id: 4,
                typeId: 4,
                date: "1970-01-01T00:00:00.000Z",
                product: "CURSO DE BEM-ESTAR",
                value: "0000004500",
                seller: "FERNANDO ALENCAR",
                createdAt: "2023-05-09T01:05:13.962Z",
                updatedAt: "2023-05-09T01:04:51.682Z",
                type: {
                    id: 4,
                    description: "Comissão recebida",
                    nature: "Entrada",
                    signal: "+",
                    createdAt: "2023-05-08T17:57:58.803Z",
                    updatedAt: "2023-05-08T17:57:42.781Z"
                }
            },

            {
                id: 4,
                typeId: 2,
                date: "1970-01-01T00:00:00.000Z",
                product: "CURSO DE BEM-ESTAR",
                value: "0000004500",
                seller: "FERNANDO ALENCAR",
                createdAt: "2023-05-09T01:05:13.962Z",
                updatedAt: "2023-05-09T01:04:51.682Z",
                type: {
                    id: 2,
                    description: "Venda filiado",
                    nature: "Entrada",
                    signal: "+",
                    createdAt: "2023-05-08T17:57:58.803Z",
                    updatedAt: "2023-05-08T17:57:42.781Z"
                }
            },
        ]);



        const responseUseCase = await findAllTransactionsUseCase.execute();

        expect(responseUseCase).toEqual(expect.arrayContaining([
            expect.objectContaining({
                typeId: expect.any(Number),
                product: expect.any(String),
                value: expect.any(String),
                seller: expect.any(String),
                date: expect.any(String),
                type: expect.any(TransactionType),
            }),
        ]));
    });

    it('Should throw an unexpected error', async () => {
        fakeSalesManagerProvider.findAllTransactions = jest.fn(() => {
            throw new Error('Some unexpected error occurred');
        });

        expect(findAllTransactionsUseCase.execute()).rejects.toThrow(CustomError);
    });

    it('Should throw an postgres invalid request error', async () => {
        fakeSalesManagerProvider.findAllTransactions = jest.fn(() => {
            throw new PostgresInvalidRequestError(__filename, 'test');
        });

        expect(findAllTransactionsUseCase.execute()).rejects.toThrow(
            PostgresInvalidRequestError,
        );
    });
});