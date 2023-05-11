import fs from 'fs';
import { promisify } from 'util';
import { IFileSystemProvider } from '../interfaces/IFileSystemProvider';

export class FileSystemProvider implements IFileSystemProvider {

    async readFile(path: string, encoding: any): Promise<any> {
        const readFile = promisify(fs.readFile);

        return readFile(path, encoding);
    }

    unlinkSync(path: string): void {
        fs.unlinkSync(path);
    }
}
