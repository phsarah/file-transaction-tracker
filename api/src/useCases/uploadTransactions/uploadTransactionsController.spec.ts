import Faker from '../../config/CreateFake';
import { UploadTransactionsUseCase } from './uploadTransactionsUseCase';
import { UploadTransactionsController } from './uploadTransactionsController';
import { UploadedFile } from '../../dtos/uploadTransactionDTO';

const fakeUploadTransactionsUseCase = Faker.create(UploadTransactionsUseCase);
const uploadTransactionsController = new UploadTransactionsController(fakeUploadTransactionsUseCase);

beforeEach(() => {
    jest.resetAllMocks();
});

describe('upload transactions controller', () => {
    it('Should call next function if some error occurred', async () => {
        const { request, response } = Faker;

        request.file = {
            path: '/sales.txt'
        } as UploadedFile;

        const error = new Error('Some unexpected error occurred');
        fakeUploadTransactionsUseCase.execute = jest.fn(() => {
            throw error;
        });

        await uploadTransactionsController.handle(request, response);

        expect(response.statusCode).toBe(500);
    });

    it('Should throw an error becaue we are missing mandatory params', async () => {
        const { request, response } = Faker;

        request.file = {}

        await uploadTransactionsController.handle(request, response);

        expect(response.statusCode).toBe(422);

    });

    it('Should validate json response', async () => {
        const { request, response } = Faker;

        request.file = {
            path: '/sales.txt'
        } as UploadedFile;

        const responseController = await uploadTransactionsController.handle(request, response);

        expect(response.statusCode).toBe(200);
        expect(responseController).toMatchObject({
            message: expect.any(String),
        });
    });
});