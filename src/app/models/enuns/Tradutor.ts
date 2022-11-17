import { Status } from "./Status";

export class Tradutor{

    traduzirString(status: string): string{
        switch (status) {
            case "cc_rejected_bad_filled_security_code": { return "Codigo de segurança inválido."; }
            case "cc_rejected_insufficient_amount": { return "Não foi autorizado pelo banco."; }
            case "cc_rejected_bad_filled_date": { return "Data do cartão é inválida."; }
            case "cc_rejected_other_reason": { return "Seu pagamento foi recusado."; }
            case "cc_rejected_bad_filled_other": { return "Dados do cartão inválido."; }
            case "cc_rejected_duplicated_payment": { return "Você já efetuou um pagamento com esse valor. Caso precise pagar novamente, utilize outro cartão ou outra forma de pagamento."; }

            case "cc_rejected_card_error": { return "Não conseguimos processar seu pagamento."; }
            case "cc_rejected_high_risk": { return "Escolha outra forma de pagamento."; }
            case "cc_rejected_invalid_installments": { return "Parcelamento não foi autorizado."; }
            case "cc_rejected_max_attempts": { return "Você atingiu o limite de tentativas permitido."; }
            case "cc_rejected_card_type_not_allowed": { return "Função crédito habilitada em seu cartão."; } 
            case "cc_rejected_call_for_authorize": { return "Pagamento foi recusado pelo banco."; } 

            case "in_process": { return "Em anaslise."; }
            case "rejected": { return "Pagamento recusado."; }
            case "pending": { return "Pendente"; }
            case "approved": { return "Aprovado"; }
            case "cancelled": { return "Cancelado"; }
            case "bank_transfer": { return "Pix"; }
            case "credit_card": { return "Cartão de crédito"; }
            case "INATIVO": { return "Inativo"; }
            case "RECESSO": { return "Recesso"; }
            case "PENDENTE": { return "Pendente"; }
            case "ABERTO": { return "Aberto"; }
            case "APROVADO": { return "Aprovado"; }            
            case "CANCELADO": { return "Cancelado"; }
            case "ESTORNO": { return "Estornado"; }
            case "PROCESSANDO": { return "Processando"; }
            case "PAY": { return "Pendente"; }
            case "CONCLUIDO": { return "Concluido"; }
            case "ANALISE": { return "Aguardando confirmação"; }
            case "CONFIRMADO": { return "Confirmado"; }
            case "ENVIADO": { return "Em transporte"; }
            case "SEPARACAO": { return "Em separação"; }
            case "ENTREGUE": { return "Pedido entregue"; }
            case "NO_ENTREGUE": { return "Nova tentativa de entrega"; }
            case "STOCK_ERROR": { return "Algo deu errado com estoque"; }
            case "DEVOLUCAO": { return "Em processo devolução"; } 
            default: { return status }
        }
    }

    traduzirStatus(status: Status): string{
        switch (status) {
            case Status.INATIVO: { return "Inativo"; }
            case Status.RECESSO: { return "Recesso"; }
            case Status.PENDENTE: { return "Pendente"; }
            case Status.ABERTO: { return "Aberto"; }
            case Status.APROVADO: { return "Aprovado"; }
            case Status.CANCELADO: { return "Analise"; }
            case Status.ESTORNO: { return "Estornado"; }
            case Status.PROCESSANDO: { return "Processando"; }
            case Status.PAY: { return "Aguardando pagamento"; }
            case Status.CONCLUIDO: { return "Concluido"; }
            case Status.ANALISE: { return "Aguardando confirmação"; }
            case Status.STOCK_ERROR: { return "Algo deu errado com estoque"; }
            default: { return "" }
        }
    }
}