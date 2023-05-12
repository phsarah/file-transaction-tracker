import { PostgresSalesManagerRepository } from '../../repositories/salesManagerRepository/implementations/PostgresSalesManagerRepository';
import { FileSystemProvider } from '../../providers/fileSystemProvider/implementations/FileSystemProvider';
import { UploadTransactionsController } from './uploadTransactionsController';
import { UploadTransactionsUseCase } from './uploadTransactionsUseCase';

const fileSystemProvider = new FileSystemProvider();
const salesManagerRepository = new PostgresSalesManagerRepository();
const uploadTransactionsUseCase = new UploadTransactionsUseCase(salesManagerRepository, fileSystemProvider);
const uploadTransactionsController = new UploadTransactionsController(uploadTransactionsUseCase);

export { uploadTransactionsController, uploadTransactionsUseCase };