export interface UploadedFile {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number,
}

export interface UploadedTransaction {
    typeId: number,
    date: Date,
    product: string,
    value: string,
    seller: string,
}
