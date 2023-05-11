import Faker from '../../config/CreateFake';
import CustomError from '../../utils/customError';
import { EmptyFileError } from '../errors/EmptyFileError';
import { UploadTransactionsUseCase } from './uploadTransactionsUseCase';
import { UploadedFile, UploadedTransaction } from '../../dtos/uploadTransactionDTO';
import { IFileSystemProvider } from '../../providers/fileSystemProvider/interfaces/IFileSystemProvider';
import { FileSystemProvider } from '../../providers/fileSystemProvider/implementations/FileSystemProvider';
import { ISalesManagerRepository } from '../../repositories/salesManagerRepository/interfaces/ISalesManagerRepository';
import { PostgresSalesManagerRepository } from '../../repositories/salesManagerRepository/implementations/PostgresSalesManagerRepository';

const fakeFileSystemProvider: IFileSystemProvider = Faker.create(FileSystemProvider);
const fakeSalesManagerProvider: ISalesManagerRepository = Faker.create(PostgresSalesManagerRepository);
const uploadTransactionsUseCase = new UploadTransactionsUseCase(fakeSalesManagerProvider, fakeFileSystemProvider);


describe('upload transactions use case', () => {

    it('Should throw EmptyFileError when data.path is not defined', async () => {
        const data = { path: undefined } as Partial<UploadedFile>;

        await expect(uploadTransactionsUseCase.execute(data as UploadedFile)).rejects.toThrow(EmptyFileError);
        expect(fakeSalesManagerProvider.saveTransactions).not.toHaveBeenCalled();
        expect(fakeFileSystemProvider.unlinkSync).not.toHaveBeenCalled();
    });


    it('Should throw EmptyFileError when the file is empty', async () => {

        const data = { path: "./sales.txt" } as Partial<UploadedFile>;

        fakeFileSystemProvider.readFile = jest.fn().mockResolvedValue('');

        await expect(uploadTransactionsUseCase.execute(data as UploadedFile)).rejects.toThrow(EmptyFileError);
    });

    it('Should save transactions and remove file after processing', async () => {

        const data = { path: "./sales.txt" } as Partial<UploadedFile>;

        fakeFileSystemProvider.readFile = jest.fn().mockResolvedValue('1 2023-05-10T10:00:00-05:00 Product 1 100 Seller 1\n2 2023-05-11T11:00:00-05:00 Product 2 200 Seller 2');
        await uploadTransactionsUseCase.execute(data as UploadedFile)

        expect(fakeSalesManagerProvider.saveTransactions).toHaveBeenCalledTimes(1);
        expect(fakeFileSystemProvider.unlinkSync).toHaveBeenCalledTimes(1);
    });

    it('Should throw CustomError when an unexpected error occurs', async () => {
        const data = { path: "./sales.txt" } as Partial<UploadedFile>;

        fakeFileSystemProvider.readFile = jest.fn().mockRejectedValue(new Error('An unexpected error'));

        await expect(uploadTransactionsUseCase.execute(data as UploadedFile)).rejects.toThrow(CustomError);
    });

    it('Should convert line to transaction when there is a match', async () => {
        fakeFileSystemProvider.readFile = jest.fn().mockResolvedValue('1 2023-05-10T10:00:00-05:00 Product 1 100 Seller 1\n2 2023-05-11T11:00:00-05:00 Product 2 200 Seller 2');

        const lines = [
            '1 2023-05-10T10:00:00-05:00 Product 100 Seller 1',
            '2 2023-05-11T11:00:00-05:00 Product 200 Seller 2'
        ];


        const expectedTransactions: UploadedTransaction[] = [
            {
                typeId: 1,
                date: new Date('2023-05-10T10:00:00-05:00'),
                product: 'Product',
                value: '100',
                seller: 'Seller 1'
            },
            {
                typeId: 2,
                date: new Date('2023-05-11T11:00:00-05:00'),
                product: 'Product',
                value: '200',
                seller: 'Seller 2'
            }
        ];

        const useCase = new UploadTransactionsUseCase(fakeSalesManagerProvider, fakeFileSystemProvider);

        const useCaseResponse = useCase['_convertLinesToTransactions'](lines);

        expect(useCaseResponse).toEqual(expectedTransactions);
    });

    it('Should log a warning when there is no match', () => {

        const useCase = new UploadTransactionsUseCase(fakeSalesManagerProvider, fakeFileSystemProvider);

        const lines = [
            'Invalid line',
            '3 2023-05-12T12:00:00-05:00 Product 3 300 Seller 3'
        ];

        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

        useCase['_convertLinesToTransactions'](lines);

        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith({
            message: 'Invalid line',
            data: 'Invalid line'
        });

        consoleWarnSpy.mockRestore();
    });
});

