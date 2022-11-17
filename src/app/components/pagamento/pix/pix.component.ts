import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Tradutor } from 'src/app/models/enuns/Tradutor';
import { Pedido } from 'src/app/models/pedidos/Pedido';
import { Usuario } from 'src/app/models/usuario/Usuario';
import { MensagemService } from 'src/app/services/MensagemService';
import { PagamentoService } from 'src/app/services/pagamento/PagamentoService';
import { PedidoService } from 'src/app/services/pedido/PedidoService';
import { RestPedido } from 'src/app/services/pedido/rest/RestPedido';

@Component({
  selector: 'spa-pix',
  templateUrl: './pix.component.html',
  styleUrls: ['./pix.component.css']
})
export class PixComponent implements OnInit {

  color = "black"
  nameButton = "Aguarde..."
  tradutor: Tradutor = {} as Tradutor
  pedido: Pedido = new Pedido
  isLoad = true;
  isView = true;
  isConfirma = false;


  constructor(
    private pagamentoService: PagamentoService,
    private mensagemService: MensagemService,
    private pedidoService: PedidoService,
    private bottomSheet: MatBottomSheet,
    private restPedido: RestPedido,
    private router: Router
  ) {
    this.tradutor = new Tradutor
  }

  ngOnInit(): void {
    this.bottomSheet.dismiss()
    if (this.pedidoService.isEmpty())
      this.router.navigate(["/cart"])

    this.pedido = this.pedidoService.findPedido()
    this.pedido.usuario = JSON.parse(localStorage.getItem("usuario")!) as Usuario
    console.log("#0")
     

     
      if (!this.isLoad) 
      console.log("#1")
      if (this.isLoad) {
        console.log("#10")
        //if (this.pedido.pagamento == null || this.pedido.pagamento.status == "cancelled" || this.pedido.pagamento.id == 0)
          this.restPedido.salvarPedidoECriarPix(this.pedido).subscribe(result => {
            this.pedido = this.pedidoService.atualizaPedido(result)
            this.printQrcode(this.pedido)
          }, err => { 
            this.pagamentoService.stopCheckConfirmacaoPagamento()
            if (err.error.type == "STOCK_ERROR") {

              this.mensagemService.sendMesage(['alert', 'Ooops!', this.tradutor.traduzirString(err.error.type)], false, false, 5000)

              this.restPedido.atualizaPedidoEstoque(this.pedido).subscribe(result => {
                this.pedidoService.atualizaPedido(result)
              })
            } else this.mensagemService.sendMesage(['alert', 'Ooops!', 'Algo deu errado ao processar o pagamento'], false, true, 4000)
            var intervalError = setInterval(() => {
              this.router.navigate(["/cart"])
              clearInterval(intervalError)
            }, 4000)
          })
      }
    

  }

  private printQrcode(pedido: Pedido) {
    console.log("#2 " + pedido.pagamento.qrCodeBase64.substring(0,10))
    if (this.pedido.pagamento != null)
      if (this.pedido.pagamento.qrCodeBase64 != null && this.pedido.pagamento.qrCodeBase64 != '')
        if (this.pedido.pagamento.qrCodeBase64.length > 100) {
          console.log("#2")
          this.isLoad = false;
          this.nameButton = "Copiar chave"
          this.checkPagamentoPix()
        }
  }

  checkPagamentoPix() {

    var pedido = this.pedidoService.findPedido()
    if (pedido.pagamento.status != null)
      if (pedido.pagamento.status == 'pending') {
        this.pagamentoService.startCheckConfirmacaoPagamento(pedido.id)
      }
  }

  enviar() {
    navigator.clipboard.writeText(this.pedido.pagamento.qrCode);
    if (this.pedido.pagamento.qrCode.length > 100)
      this.mensagemService.sendMesage(['alert', 'Show!', 'Pix foi copiado'], false, false, 3000)
    else
      this.mensagemService.sendMesage(['alert', 'Ooops!', 'Pagamento ainda não foi gerado'], false, false, 3000)
  }

  sim() {
    this.pagamentoService.stopCheckConfirmacaoPagamento()
    localStorage.removeItem('pay')
    this.pedido.pagamento.id = 0
    this.pedidoService.savePedido(this.pedido)
    this.router.navigate(["/checkout"])
    this.bottomSheet.dismiss()
  }

  nao() {
    this.isView = true
    this.isConfirma = false
  }

  voltar() {

    if (this.nameButton == "Aguarde...") {
      localStorage.removeItem('pay')
      this.router.navigate(["/checkout"])
    }

    if (!this.pedidoService.isEmpty()) {
      if (localStorage.getItem('pay') != null) {
        if (this.pagamentoService.isChecking()) {
          this.mensagemService.sendMesage(['alert', 'Deseja fazer alterações no pedido?', 'Faça isso caso ainda não tenha feito pagamento.'], false, true, 30000)
          this.isView = false
          this.isConfirma = true
          console.log("confirmar")
        }
        else {
          localStorage.removeItem('pay')
          this.router.navigate(["/checkout"])
        }
        this.pedido.pagamento.id = 0
        this.pedidoService.savePedido(this.pedido)
      }
      else this.router.navigate(['/cart'])
    } else this.router.navigate(['/cart'])
  }

  registraPedido(): Pedido {
    var pedido = this.pedidoService.findPedido()
    return this.pedido
  }

}
