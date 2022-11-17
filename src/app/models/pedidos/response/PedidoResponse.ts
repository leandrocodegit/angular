import { CardHolder } from "src/app/models/checkouts/CardHolder"; 
import { Pagamento } from "../../checkouts/Pagamento";
import { Status } from "../../enuns/Status";
import { ProdutoPedido } from "../../produto/ProdutoPedido";
import { Usuario } from "../../usuario/Usuario"; 
 

export interface PedidoResponse{  
          id: string,
          identificador: number,
          produtos: ProdutoPedido[],
          total: number,
          desconto: number,
          itens: number,
          usuario: Usuario, 
          dataPedido?: Date,
          ultimaAtualizacao?: Date,
          status?: Status,
          pagamento: Pagamento  
    
}