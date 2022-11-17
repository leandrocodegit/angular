import { Location } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QRCode } from 'src/app/models/qrcode/QRCode';
import { MensagemService } from 'src/app/services/MensagemService';
import { PedidoService } from 'src/app/services/pedido/PedidoService';
import { RouterService } from 'src/app/services/RouterService';


declare var initScan: any
declare var stop: any
declare var qrcode: any

@Component({
  selector: 'spa-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})

export class QrCodeComponent implements OnInit, OnDestroy {
  isViewIcons = false 
  constructor(
    private mensagemService: MensagemService,
    private pedidoService: PedidoService,
    private routerService: RouterService,
    private router: Router,
  ) {
  }
  ngOnDestroy(): void {
    stop(); 
  }

  ngOnInit(): void {  
      if (!this.pedidoService.isEmpty())
          this.isViewIcons = true
    initScan() 
    
  }

  enviar() {
    this.voltar()
  }

  voltar() {

    if (this.routerService.previosPage == "/") {
      if (localStorage.getItem('qrcode') != null) {
        var qrcode: QRCode = JSON.parse(localStorage.getItem('qrcode')!)
        this.router.navigate(['/scan/' + qrcode.id])
      } else {
        if (this.pedidoService.isEmpty())
          this.mensagemService.sendMesage(['alert', 'Ooopa, quase lá.', 'Scanei um qrcode para continuar.'], false, true, 8000)
        else this.router.navigate(['/cart'])
      }
    } else this.router.navigate([this.routerService.previosPage])
    console.log("URL " + this.routerService.previosPage)
  }

  redirec() {
    var url: string = qrcode()
    console.log("URL " + url)
    if (url.length > 20)
      this.router.navigate(['/scan/' + url.substring(url.lastIndexOf("/"))])
  }
}
