import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HOST } from 'src/app/models/enuns/BEARER';
import { Tradutor } from 'src/app/models/enuns/Tradutor';
import { Pedido } from 'src/app/models/pedidos/Pedido';
import { MensagemService } from 'src/app/services/MensagemService';
import { PedidoService } from 'src/app/services/pedido/PedidoService';
import { RestPedido } from 'src/app/services/pedido/rest/RestPedido';

@Component({
  selector: 'spa-devolucao',
  templateUrl: './devolucao.component.html',
  styleUrls: ['./devolucao.component.css']
})
export class DevolucaoComponent implements OnInit {
 
  nameButton = "Aguarde..."
  color = "black"
  HOST = HOST
  numeroPedido: string = ""
  tradutor:Tradutor = {} as Tradutor
  pedido: Pedido = new Pedido
  isConfirmar = false
  isLoad = true

  constructor(
    private mensagemService: MensagemService,
    private pedidoService: PedidoService,
    private activeRoute: ActivatedRoute,
    private restPedido: RestPedido,
    
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
      this.nameButton = "Continuar"
      this.color = "black"
      if(this.pedido.status.toString() == "CANCELADO"){
        this.mensagemService.sendMesage(['alert',  'Oooops?', 'Esse pedido já foi cancelado.'], true, true, 30000)
        this.router.navigate(["/pedido/status/" + this.pedido.identificador])
      }      
    })
  }

  voltar(){
    this.router.navigate(["/pedido"])
  }

  enviar(){
    this.mensagemService.sendMesage(['alert',  'Confirma devolução do pedido?', 'Lembre-se que o pedido será retirado no seu endereço.'], false, true, 30000)
    this.isConfirmar = true
  }

  sim(){

    this.restPedido.registrarDevolucaoPedido(this.pedido).subscribe(result => {
      this.router.navigate(["/pedido/status/" + this.pedido.id])
    }, err => {
        this.mensagemService.sendMesage(['alert', '','Ooops!', err.error.message], true, true, 5000)
    })
    
  }

  nao(){
    console.log("Não")
    this.isConfirmar = false
  }

}
