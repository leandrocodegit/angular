import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Payer } from 'src/app/models/checkouts/Payer';
import { CardHolder } from 'src/app/models/checkouts/CardHolder';
import { ResponseCheckout } from 'src/app/models/checkouts/ResponseCheckout';
import { Tradutor } from 'src/app/models/enuns/Tradutor';
import { Pedido } from 'src/app/models/pedidos/Pedido';
import { MensagemService } from 'src/app/services/MensagemService';
import { PagamentoService } from 'src/app/services/pagamento/PagamentoService';
import { PaymentService } from 'src/app/services/PaymentService';
import { PedidoService } from 'src/app/services/pedido/PedidoService';
import { RestPedido } from 'src/app/services/pedido/rest/RestPedido';
import { RouterService } from 'src/app/services/RouterService';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario/Usuario';
import { Identification } from 'src/app/models/checkouts/Identification';
import { FormularioCartao } from 'src/app/models/checkouts/FormularioCartao';
import { Issuer } from 'src/app/models/checkouts/Issuer';
import { ViewportScroller } from '@angular/common';
import { RestPagamento } from 'src/app/services/pedido/rest/RestPagamento';


declare var loadCardForm: any;
declare var selectUpdateIssuer: any
declare var gerarToken: any

@Component({
  selector: 'spa-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {

  pedido: Pedido = {} as Pedido
  isLoad: boolean = false
  parcelas = 0
  isValid: boolean = false
  isOpen = false
  nameButton = "Pagar"
  color = "#0dcaf0"


  @ViewChild("mes") mes!: ElementRef;
  card: CardHolder = {} as CardHolder;
  cardNumber: string = '';
  cardExpirationMonth: string = '';
  cardExpirationYear: string = '';
  securityCode: string = '';
  tradutor: Tradutor = new Tradutor
  cardHolder = new CardHolder
  responsePay = {} as ResponseCheckout
  heroForm: FormGroup = {} as FormGroup
  usuario: Usuario = new Usuario
  formulario = new FormularioCartao
  issuer = new Issuer
  error = {} as any

  constructor(
    private pagamentoService: PagamentoService,
    private viewPortscroller: ViewportScroller,
    private mensagemService: MensagemService,    
    private _bottomSheet: MatBottomSheet,
    private routerService: RouterService,
    private pedidoService: PedidoService,
    private restPagamento: RestPagamento,
    private restPedido: RestPedido,
    private router: Router
  ) {

  }
  ngOnDestroy(): void {
    document.getElementById('concluir')?.style.setProperty("color", "red!important");
    this._bottomSheet.dismiss();
  }
  ngOnInit(): void {

    if (localStorage.getItem('pay') != null && localStorage.getItem('pay') == 'pix')
      this.pagamentoService.stopCheckConfirmacaoPagamento()

    this.usuario = JSON.parse(localStorage.getItem('usuario')!)
    this.formulario.email = this.usuario.email
    this.formulario.nome = this.usuario.nome
    this.formulario.documento = this.usuario.documento
    this.setNomeCard()

    if (this.pedidoService.isEmpty())
      this.router.navigate(["/cart"])

      this.pedido = this.pedidoService.findPedido()  
        this.pedido.usuario = JSON.parse(localStorage.getItem("usuario")!) as Usuario
        this.restPedido.salvarPedido(this.pedido).subscribe(result => {                
           this.pedido = this.pedidoService.atualizaPedido(result)    
         })  

    
      
    new loadCardForm()
    this.routerService.savePreviosPage(this.router.url)
  }
 
  registraPedido() {
    
    this.formulario.token = gerarToken() 
    if(this.formulario.token.length == 0)
        this.formulario.token = gerarToken()

    if (this.isValid && this.isLoad == false) {
      this.isLoad = true
      this.nameButton = "Processando..."
      this.color = "black"
      var pedido = this.pedidoService.findPedido()
      this.cardHolder.parcelas = this.parcelas  

      console.log("**********************************************")
      console.log(JSON.stringify(
        new CardHolder(
          this.formulario.token, 
          this.formulario.payment_method_id,
          pedido.total.toString(),
          this.formulario.installments,
          pedido.id,
          new Payer(
            this.formulario.email, 
            this.formulario.nome, 
              "CPF",
              this.formulario.documento 
          )
      )))

      this.restPagamento.criarPagamentoCartao(new CardHolder(
        this.formulario.token, 
        this.formulario.payment_method_id,
        pedido.total.toString(),
        this.formulario.installments,
        pedido.id,
        new Payer(
          this.formulario.email, 
          this.formulario.nome, 
            "CPF",
            this.formulario.documento 
        )
      )).subscribe(result => {    
        if (result.status == 'approved' || result.status == 'in_process') {
          this.router.navigate(['/pedido/status/' + pedido.identificador]);
          //this.pedidoService.savePedido(result)
        } else {
          this.isLoad = false
          this.nameButton = "Pagar"
          this.color = "#0dcaf0"

          this.mensagemService.sendMesage(['alert', 'Ooops!', this.tradutor.traduzirString(result.detalhes)], false, false, 5000)
        }
      }, err => {

        this.pagamentoService.stopCheckConfirmacaoPagamento()
        if (err.error.type == "STOCK_ERROR") {
          this.mensagemService.sendMesage(['alert', 'Ooops!', this.tradutor.traduzirString(err.error.type)], false, false, 5000)
          this.restPedido.atualizaPedidoEstoque(this.pedido).subscribe(result => {
            this.pedidoService.atualizaPedido(result)
          })

          var intervalError = setInterval(() => {
            this.router.navigate(["/cart"])
            clearInterval(intervalError)
          }, 5000)
        } else {
          this.mensagemService.sendMesage(['alert', 'Ooops!', 'Algo deu errado.'], false, false, 5000)
          this.isLoad = false
        }
        this.nameButton = "Pagar"
        this.color = "#0dcaf0"
      })
    }
  }

  voltar() {
    localStorage.removeItem('pay')
    this.router.navigate(['/checkout'])
    }
 
  openSheet(): void {

    if (this.isOpen) {
      this._bottomSheet.dismiss();
      this.isOpen = false
    } else {
      this._bottomSheet.open(ConfirmComponent);
      this.isOpen = true
    }
  }

  validate(element: string): boolean {
    this.formulario.cartao = this.formulario.cartao.replace(' ', '').replace(' ', '').trim()
    var minCard = 3
    if(this.issuer.payment_method_id == "amex")
      minCard = 4

    this.heroForm = new FormGroup({
      documento: new FormControl(this.formulario.documento, [Validators.required, Validators.pattern('[0-9]{1}[0-9][0-9]{9}')]),
      nomeCartao: new FormControl(this.formulario.nomeCartao, [Validators.required, Validators.minLength(10), Validators.pattern('^[a-zA-Z ]*$')]),
      mes: new FormControl(this.formulario.mes, [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.min(1), Validators.max(12)]),
      ano: new FormControl(this.formulario.ano, [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.min(22), Validators.max(35)]),
      cartao: new FormControl(this.formulario.cartao, [Validators.required, Validators.minLength(15), Validators.maxLength(16)]),
      cvv: new FormControl(this.formulario.cvv, [Validators.required, Validators.minLength(minCard), Validators.maxLength(minCard)]),
      parcelas: new FormControl(this.formulario.installments, [Validators.required, Validators.min(1)])
    })

    if (element == 'cartao')
       this.issuer = selectUpdateIssuer()

    if(this.formulario.issuer == "")  
       this.issuer = selectUpdateIssuer() 
       
    if (this.heroForm.get('nomeCartao')?.valid && element == 'nomeCartao')
      document.getElementById('form-checkout__cardholderName')?.focus()
    else if (this.heroForm.get('mes')?.valid && element == 'mes'){
      this.viewPortscroller.scrollToAnchor("form-checkout__securityCode");
      document.getElementById('form-checkout__cardExpirationYear')?.focus()      
    }
    else if (this.heroForm.get('ano')?.valid && element == 'ano')
      document.getElementById('form-checkout__securityCode')?.focus()
    else if (this.heroForm.get('cvv')?.valid && element == 'cvv'){
      this.viewPortscroller.scrollToAnchor("form-checkout__installments");
      document.getElementById('form-checkout__installments')?.focus()
    }

    console.log("Valid formulario " + this.heroForm.valid)

    if (this.heroForm.valid){
      this.formulario.token = gerarToken()
      this.isValid = true
    }        

      this.formulario.issuer = this.issuer.issuer_id
      this.formulario.payment_method_id = this.issuer.payment_method_id 
    return this.heroForm.valid
  }

  private setNomeCard(){
    var values = this.formulario.nome.split(" ")  
    if(values.length > 2){
      this.formulario.nomeCartao = values[0] + " " + values[1].charAt(0) + " " + values[values.length - 1];
    }else this.formulario.nomeCartao  = this.formulario.nome     
  }
 
}
