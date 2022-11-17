export interface Pagamento {
    id: string,
    dataCriacao: Date,
    dataAprovacao: Date,
    ultimaAtualizacao: Date,
    dataExpiracao: Date,
    dataEstorno: Date,
    tipoOperacao: string,
    issuerId: string,
    metodoPagamento: string,
    status: string,
    detalhes: string,
    valor: number,
    total: number,
    valorParcela: number,
    parcelas: number,
    quatroDigitosCartao: string
    qrCodeBase64: string,
    qrCode: string,
    url: string,
    barcode: string
}