export interface applianceModel {
    id: number;
    name: string;
    types: string;
    desc: string;
    price: number;
    techspec: string;
    quant: number;
    imgPath: string;
}

export interface CartModel {
    id: number;
    name: string;
    types: string;
    desc: string;
    amount: number;
    techspec: string;
    quantity: number;
    imgPath: string;
    uid: string
}

