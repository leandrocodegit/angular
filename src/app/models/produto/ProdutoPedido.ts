import { QRCode } from "../qrcode/QRCode";

export class ProdutoPedido{
    constructor(
    public qrcode: QRCode,
    public quantidade: number){}
}