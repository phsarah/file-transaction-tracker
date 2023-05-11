export interface IFileSystemProvider {
    readFile(path: string, encoding: any): Promise<any>;
    unlinkSync(path: string): void;
}