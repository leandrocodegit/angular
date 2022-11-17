import { Component, OnDestroy, OnInit } from '@angular/core';  
import { Pedido } from 'src/app/models/pedidos/Pedido';
import { PedidoService } from 'src/app/services/pedido/PedidoService';  

@Component({
  selector: 'spa-detalhes-pedido',
  templateUrl: './detalhes-pedido.component.html',
  styleUrls: ['./detalhes-pedido.component.css']
})
export class DetalhesPedidoComponent implements OnInit, OnDestroy {

  pedido: Pedido = {} as Pedido 
  mensagem: string[] = []
  isPix = false

  constructor(
    private pedidoService: PedidoService,    
  ) { }
  ngOnDestroy(): void {
    this.mensagem = []
  }

  ngOnInit(): void {
        this.pedido = this.pedidoService.findPedido()
    console.log("Pedido " + localStorage.getItem('pay')) 
    if (localStorage.getItem('pay') != null && localStorage.getItem('pay') == 'pix')
      this.isPix = true

  } 
}
