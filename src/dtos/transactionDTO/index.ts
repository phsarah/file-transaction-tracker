export enum TransactionTypeNature {
    entrada = 'Entrada',
    saida = 'Saída'
}

export class TransactionType {
    public id?: number;
    public description: string;
    public nature: TransactionTypeNature;
    public signal: string;

    constructor(props: TransactionType) {
        this.id = props.id;
        this.description = props.description;
        this.nature = props.nature;
        this.signal = props.signal;
    }
}


export class Transaction {
    public id?: string;
    public typeId: number;
    public product: string;
    public value: string;
    public seller: string;
    public date: Date;
    public type: TransactionType;

    constructor(props: Transaction) {
        this.id = props.id;
        this.typeId = props.typeId;
        this.product = props.product;
        this.value = props.value;
        this.seller = props.seller;
        this.date = props.date;
        this.type = props.type;
    }
}






