import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { HOST } from 'src/app/models/enuns/BEARER';
import { Status } from 'src/app/models/enuns/Status';
import { Parceiro } from 'src/app/models/produto/Parceiro'; 
import { ProdutoParceiro } from 'src/app/models/produto/ProdutoParceiro';
import { QRCode } from 'src/app/models/qrcode/QRCode';
import { CarrinhoService } from 'src/app/services/CarrinhoService';
import { EtapaService } from 'src/app/services/EtapaService';
import { MensagemService } from 'src/app/services/MensagemService';
import { PedidoService } from 'src/app/services/pedido/PedidoService';
import { ProdutoService } from 'src/app/services/produto/ProdutoService'; 
import { QRCodeService } from 'src/app/services/qrcode/QRCodeService';
import { RouterService } from 'src/app/services/RouterService';

@Component({
  selector: 'spa-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit, OnDestroy {

  nameButton = 'Comprar'
  qrcode: QRCode = {} as QRCode
  produtos: ProdutoParceiro[] = [];
  parceiro: Parceiro = {} as Parceiro 
  HOST = HOST
  isLoad = true
  isStock = true

  constructor( 
    private activeRoute: ActivatedRoute, 
    private qrcodeService: QRCodeService,
    private pedidoService: PedidoService,
    private router: Router
  ) { }

  ngOnInit(): void {   
    this.buscaProduto() 
  }

 private buscaProduto(){
    try {
      this.activeRoute.params.subscribe(params => {
        var id = params['qrcode']
        this.qrcodeService.findQRcodeById(id).subscribe(result => {            
          localStorage.setItem('qrcode', JSON.stringify(result)) 
          localStorage.setItem('parceiro', JSON.stringify(result.parceiro))          
          this.qrcode = result  
          console.log(JSON.stringify(this.qrcode)) 
          if(this.qrcode.produto.estoque.estoqueAtual <= 0 || this.qrcode.status.toString() != "ATIVO"){
            this.isStock = false
            this.nameButton = "Escanear"
          } 
          this.isLoad = false                
        })        
        if (localStorage.getItem('parceiro') != null)
          this.parceiro = JSON.parse(localStorage.getItem('parceiro')!) 

          
      }, error => {
        alert()
      })
      
    } catch (error) {
      console.log("Error") 
    }

    
   
  }

  ngOnDestroy(): void {    
  }
 
  enviar(){ 
    if(this.nameButton == 'Comprar'){
    this.pedidoService.adicionar(this.qrcode)
    this.router.navigate(["/cart"])    
    }else{
      this.router.navigate(["/scan"])
    }
  }


}


