import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ResponseCheckout } from 'src/app/models/checkouts/ResponseCheckout';  
import { Tradutor } from 'src/app/models/enuns/Tradutor';
import { Pedido } from 'src/app/models/pedidos/Pedido';
import { RestPedido } from 'src/app/services/pedido/rest/RestPedido'; 

@Component({
  selector: 'spa-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  
  nameButton = "Aguarde..."
  color = "black"
  mensagem = "Pedido realizado com sucesso"
  numeroPedido: string = ""
  tradutor:Tradutor = {} as Tradutor
  pedido: Pedido = new Pedido
  isLoad = true
  isDanger = false

  constructor(
    private restPedido: RestPedido,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.tradutor = new Tradutor
   }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.numeroPedido = params['id']
    })
    var interval = setInterval(() => {       
      this.updatePedido()
      if(this.pedido.pagamento != null)
        clearInterval(interval)
    }, 3000)
    
  }

  updatePedido(){      
    this.restPedido.buscarPedido(this.numeroPedido).subscribe(result => {
      this.pedido = result
      this.isLoad = false
      if(this.pedido.status.toString().includes("DEVOLUCAO")){
        this.mensagem = "Pedido de devolução foi realizado com sucesso"
        this.isDanger = true
      }
     else if(this.pedido.status.toString().includes("CANCELADO")){
        this.mensagem = "Pedido foi cancelado"
        this.isDanger = true
      }
       
        this.nameButton = "Continuar"
        this.color = "black"     
        
    }
    )
  }

  enviar(){
    console.log("ATUALIZANDO  PEDIDO PARA NOVO " + this.isLoad)
    localStorage.removeItem('pedido')
        localStorage.removeItem('pay')
        localStorage.removeItem('cadastro') 
        localStorage.removeItem('pedido') 
        this.router.navigate(["/pedido"])
  }


}
