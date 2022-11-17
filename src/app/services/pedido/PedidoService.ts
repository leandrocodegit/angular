import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core" 
import { CardHolder } from "src/app/models/checkouts/CardHolder"
import { Pagamento } from "src/app/models/checkouts/Pagamento" 
import { Pedido } from "src/app/models/pedidos/Pedido" 
import { PedidoRequestPayment } from "src/app/models/pedidos/request/PedidoRequestPayment"
import { ProdutoPedido } from "src/app/models/produto/ProdutoPedido"
import { QRCode } from "src/app/models/qrcode/QRCode"
import { Usuario } from "src/app/models/usuario/Usuario"
import { MensagemService } from "../MensagemService" 

@Injectable({
    providedIn: 'root'
})
export class PedidoService {

    constructor(
        private mensagemService: MensagemService,
        private httpClient: HttpClient


    ) {}


    toConvert(pedido: Pedido, cardHolder: CardHolder): PedidoRequestPayment {
        var user: Usuario = JSON.parse(localStorage.getItem('usuario')!)
        return new PedidoRequestPayment( 
            pedido.produtos,
            pedido.total,
            pedido.desconto,
            pedido.itens,
            user,
            cardHolder)
    }

    clearPedido(): Pedido{
        localStorage.removeItem('pedido')
        return new Pedido()
    }

    findPedido(): Pedido {
        if (localStorage.getItem('pedido') != null) { 
            return JSON.parse(localStorage.getItem('pedido') as string)
        }
        return this.clearPedido()
    }


    isEmpty(): boolean {
        if (localStorage.getItem('pedido') != null) {
            if (this.findPedido().produtos.length > 0)
                return false
        }
        return true
    }

    isContainsProduto(id: String): boolean {

        var carrinho: ProdutoPedido[] = this.findPedido().produtos

        for (let index = 0; index < carrinho.length; index++) {
            const element = carrinho[index];
            if (element.qrcode.id == id) {
                return true
                break
            }
        }
        return false
    }

    savePedido(pedido: Pedido) {    
        console.log("*************************************")
          console.log(JSON.stringify(pedido.pagamento))   
        localStorage.setItem('pedido', JSON.stringify(pedido))
        console.log("#### Salvo" + JSON.stringify(pedido))
        console.log("Atualizando... "  + pedido.subTotal)

        console.log("Atualizando pedido.total... "  + JSON.parse(localStorage.getItem('pedido')!).total)
        console.log("Atualizando pedido.desconto... "  + JSON.parse(localStorage.getItem('pedido')!).desconto)
    }

    atualizaPedido(pedido: Pedido): Pedido {

        if (true) {
         //   pedido.status = Status.NEW
            if (pedido.produtos.length > 0) {  
                var total = 0
                var desconto = 0
                var itens = 0

                for (let index = 0; index < pedido.produtos.length; index++) {
                    const element = pedido.produtos[index];

                    if (element.qrcode.produto.estoque.estoqueAtual <= 0) {
                        this.mensagemService.sendMesage(
                            ['produto',    
                            'Indisponivel!',                       
                                element.qrcode.produto.descricao.toString(),
                                element.qrcode.produto.codigo + '/120/0',
                            ], true, false, 5000)
                        continue
                    }
                    console.log("Atualizando...")

                    if (element.quantidade > element.qrcode.produto.estoque.estoqueAtual)
                        element.quantidade = element.qrcode.produto.estoque.estoqueAtual
                    total += element.qrcode.preco * element.quantidade
                    if (element.qrcode.multi_desconto) {
                        desconto += element.qrcode.desconto * element.quantidade
                    } else {
                        desconto += element.qrcode.desconto
                    }
                    itens += element.quantidade
                }
                pedido.subTotal = Number.parseFloat((total).toFixed(2))
                pedido.total = Number.parseFloat((total - desconto).toFixed(2))
                pedido.desconto = Number.parseFloat((desconto).toFixed(2))
                pedido.itens = itens

                console.log("Atualizando pedido.total... "  + pedido.total)
                console.log("Atualizando pedido.desconto... "  + pedido.desconto)

                this.savePedido(pedido)                
                return pedido
            }
        }

        return this.findPedido()
    }


    verificaEstoqueProdutosCarrinho(pedido: Pedido) {

        console.log("Verificando")
        pedido.produtos.forEach(element => {

            console.log("Verificando  " + element.qrcode.produto.estoque.estoqueAtual)
            if (element.qrcode.produto.estoque.estoqueAtual <= 0) {
                console.log("Enviando mensagem  " + element.qrcode.produto.estoque.estoqueAtual)
                this.mensagemService.sendMesage(
                    ['produto','Indisponivel!',                    
                        element.qrcode.produto.descricao.toString(),
                        element.qrcode.produto.codigo + '/120/0',
                    ], true, true, 5000)
            }
        })
    }

    findItem(id: string): ProdutoPedido {
        this.findPedido().produtos.forEach(element => {
            if (element.qrcode.id == id)
                return element
            return {} as ProdutoPedido
        });
        return {} as ProdutoPedido
    }

    adicionar(qrCode: QRCode) {
        if (!this.isContainsProduto(qrCode.id)) {
            var pedido: Pedido = this.findPedido()
            pedido.produtos[pedido.produtos.length] = new ProdutoPedido(qrCode, 1) 
            this.atualizaPedido(pedido)
        }
    }

    incrementar(qrCode: QRCode): ProdutoPedido[] {
        var pedido: Pedido = this.findPedido()
        console.log("INC+++++++++++ " + JSON.stringify(pedido))

        pedido.pagamento = new Pagamento
        var carrinho: ProdutoPedido[] = pedido.produtos

        carrinho.forEach(element => {
            if (element.qrcode.id == qrCode.id) {
                element.quantidade++ 
            }
        });
        this.atualizaPedido(pedido)
        return carrinho
    }

    decrementar(qrCode: QRCode): ProdutoPedido[] {

        var pedido: Pedido = this.findPedido()
        pedido.pagamento = new Pagamento
        var carrinho: ProdutoPedido[] = pedido.produtos

        carrinho.forEach(element => {
            if (element.qrcode.id == qrCode.id) {
                if (element.quantidade > 1) {
                    element.quantidade-- 
                }
            }
        });
        this.atualizaPedido(pedido)
        return carrinho
    }

    remover(qrCode: QRCode): ProdutoPedido[] {

        var pedido: Pedido = this.findPedido()
        pedido.pagamento = new Pagamento
        var carrinho: ProdutoPedido[] = pedido.produtos

        for (let index = 0; index < carrinho.length; index++) {
            const element = carrinho[index];
            console.log("Remove " + qrCode.id)
            console.log("Produtos " + JSON.stringify(pedido.produtos))
            if (element.qrcode.id == qrCode.id) {
                carrinho.splice(index, index + 1)
                console.log("Removido " + element.qrcode.id)
                console.log("Produtos " + JSON.stringify(pedido.produtos))
                break
            }
            
        }
        if (pedido.produtos.length > 0)
            this.atualizaPedido(pedido)
        else this.savePedido(new Pedido())

        return carrinho
    }
}