import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/services/MensagemService';
import { PagamentoService } from 'src/app/services/pagamento/PagamentoService';
import { PedidoService } from 'src/app/services/pedido/PedidoService';
import { RestPedido } from 'src/app/services/pedido/rest/RestPedido';
import { RouterService } from 'src/app/services/RouterService';
import { FooterComponent } from '../../view/footer/footer.component';


@Component({
  selector: 'spa-forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.css']
})
export class FormaPagamentoComponent implements OnInit, OnDestroy {

  constructor(
    private mensagemService: MensagemService,
    private pedidoService: PedidoService,
    private routerService: RouterService,
    private restPedido: RestPedido,
    private router: Router
  ) { }

  ngOnInit(): void {

    if(this.pedidoService.findPedido().itens == 0)
      this.router.navigate(["/cart"])

    if (localStorage.getItem('pay') != null) {
      if (localStorage.getItem('pay') == 'card') {
        this.router.navigate(["/checkout/card"])
      }
      if (localStorage.getItem('pay') == 'pix') {
        this.router.navigate(["/checkout/pix"])
      }
    }
  }

  ngOnDestroy(): void {
  }

  pay(type: string) {


    localStorage.setItem('pay', type)
    this.router.navigate(["/checkout/" + type])
    console.log('Pay ' + localStorage.getItem('pay'))
  }

  enviar() {
    this.router.navigate(["/cart"])
  }

}
