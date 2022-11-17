import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Token } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Pedido } from "src/app/models/pedidos/Pedido";
import { PedidoService } from "../pedido/PedidoService";
import { RestPedido } from "../pedido/rest/RestPedido";

@Injectable({
    providedIn: 'root'
})
export class PagamentoService {

    constructor(
        private httpClient: HttpClient,
        private restPedido: RestPedido,
        private pedidoService: PedidoService,
        private router: Router) { }

    destroy = true;

    startCheckConfirmacaoPagamento(numeroPedido: string) {
        this.destroy = false
        this.checkConfirmacaoPagamento(numeroPedido)
    }

    stopCheckConfirmacaoPagamento() {
        this.destroy = true
        console.log("Stop check pagamento") 
    }

    isChecking(): boolean {
        return !this.destroy;
    }


    private checkConfirmacaoPagamento(numeroPedido: string) {
        var interval = setInterval(() => {

            if (this.destroy)
                clearInterval(interval)

            this.restPedido.buscarPedidoPagamento(numeroPedido).subscribe(result => {
                if (result.pagamento.id == 0) {
                    this.stopCheckConfirmacaoPagamento()
                    clearInterval(interval)
                }
                console.log("Checando pagamento " + result.pagamento.status)
                if (result.pagamento.status == 'approved' || result.pagamento.status == 'cancelled') {
                    if (result.pagamento.status == 'approved')
                        this.router.navigate(['/pedido/status/' + numeroPedido]); 
                    this.pedidoService.savePedido(result)
                    this.stopCheckConfirmacaoPagamento()
                    clearInterval(interval)
                }
            })
        }, 2000)
    }




}


