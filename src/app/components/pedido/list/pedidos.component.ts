import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagamento } from 'src/app/models/checkouts/Pagamento';
import { HOST } from 'src/app/models/enuns/BEARER';
import { Status } from 'src/app/models/enuns/Status';
import { Tradutor } from 'src/app/models/enuns/Tradutor';
import { Pedido } from 'src/app/models/pedidos/Pedido'; 
import { MensagemService } from 'src/app/services/MensagemService';
import { PedidoService } from 'src/app/services/pedido/PedidoService';
import { RestPedido } from 'src/app/services/pedido/rest/RestPedido';
import { RouterService } from 'src/app/services/RouterService'; 
import {MDCDrawer} from "@material/drawer";
import { fadeInLeftAnimation, rubberBandAnimation, bounceInAnimation,bounceInLeftAnimation } from 'angular-animations'; 

@Component({
  selector: 'spa-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  animations: [
    rubberBandAnimation(),
    fadeInLeftAnimation(),
    bounceInLeftAnimation(),
    bounceInAnimation()
  ]
})
export class PedidosComponent implements OnInit, OnDestroy {

  color = 'black'
  copiaNumeroPedido = ''
  isConfirmar = false
  isAnimate = false
  nameButton = 'Novo pedido'
  HOST = HOST
  pedidos: Pedido[] = []
  tradutor: Tradutor = {} as Tradutor
  panelOpenState = false;
  isLoad = true;
  status: Status = Status.NEW
  pedidoRefazer: Pedido = new Pedido()
  drawer:MDCDrawer = {} as MDCDrawer
  pedidoSelect: Pedido = new Pedido

  constructor(
    private mensagemService: MensagemService,
    private pedidoService: PedidoService,
    private routerService: RouterService,
    private restPedido: RestPedido,
    private router: Router
  ) {
    this.tradutor = new Tradutor
  }

  ngOnInit(): void {

    this.animate()
  
     this.drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer')!);

    var x = ""
    var pedido: Pedido

    this.restPedido.listPedidos().subscribe(result => {
      console.log(JSON.stringify(result))
      this.pedidos = result
      pedido = result[0] 
      this.isLoad = false
      const listEl = document.querySelector('.mdc-drawer .mdc-deprecated-list')!;
const mainContentEl = document.querySelector('.main-content'); 
 

var foos =  document.querySelectorAll('input')  
      foos.forEach(elem => {   
        elem.focus() 
      })
      
    }, err => {
      this.isLoad = false
      this.mensagemService.sendMesage(['alert', 'Ooops!', 'Algo deu errado, tente atualizar a pagina!'], false, true, 8000)
    })
  }

  ngOnDestroy(): void {
    this.routerService.savePreviosPage(this.router.url)
  }

  devolver(pedidoRef: Pedido) {
    this.router.navigate(["pedido/devolucao/" + pedidoRef.id])
  }

  refazer(pedidoRef: Pedido) {
    this.restPedido.gerarRegistro().subscribe(result => {
      localStorage.removeItem('pedido')
      localStorage.removeItem('cadastro')
      pedidoRef.pagamento = new Pagamento
      pedidoRef.status = Status.ABERTO 
      pedidoRef.id = ""
     // pedidoRef.registro = result
      pedidoRef.itens = pedidoRef.itens
      this.pedidoRefazer = pedidoRef      

      this.restPedido.criarPedido(pedidoRef).subscribe(result => {
        localStorage.setItem('pedido', JSON.stringify(pedidoRef))
        console.log("############ pedidoRef: " + JSON.stringify(pedidoRef))
        this.pedidoService.atualizaPedido(result)
        this.router.navigate(["/cart"])         
      }, err => {
        this.mensagemService.sendMesage(['alert', 'Informação!', 'Alguns itens desse pedido foram alterados.'], false, true, 800000)
        this.nameButton = "Continuar"
        this.color = 'red'
        this.isConfirmar = true
      })
    })
  }

  sim() { 
    console.log('Pedido ---------------- ' + JSON.stringify(this.pedidoRefazer))
    this.restPedido.atualizaPedidoItens(this.pedidoRefazer).subscribe(result => { 
      localStorage.removeItem('pedido')
      this.pedidoService.savePedido(result)    
      this.router.navigate(["/cart"])            
    },err =>{
      console.log('Pedido ---------------- error')
    })
   
  }

  pagar(pedido: Pedido) {
    //localStorage.setItem('pedido',id)
    localStorage.removeItem('cadastro')
    this.pedidoService.atualizaPedido(pedido)
    this.router.navigate(["/cart"])
  }

  enviar() { 
    this.router.navigate(["/scan"])
  }

  voltar() {    
    console.log('Clicou voltar ' + (this.drawer.open == true))
    this.drawer.open = false;
      
  }

  open(pedido: Pedido){
       this.pedidoSelect = pedido  
       this.copiaNumeroPedido = ''
       this.drawer.open = true;
       document.getElementById('box-container')?.focus() 
       console.log('Clicou selecionar ' + (this.drawer.open == true))
  }

  copiar(){
    this.copiaNumeroPedido = this.pedidoSelect.identificador.toString()
    navigator.clipboard.writeText(this.pedidoSelect.id.toString());
    this.animate()   
  }
 
  close(){ 
    this.drawer.open = false;
    
}

animate() {
  this.isAnimate = false;
 var interval = setTimeout(() => {
    this.isAnimate = true; 
    clearInterval(interval)
  }, 1);
}



}
