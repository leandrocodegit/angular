import { Component, OnInit } from '@angular/core';
import { QRCode } from 'src/app/models/qrcode/QRCode';

@Component({
  selector: 'spa-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

  qrcode: QRCode = {} as QRCode

  constructor() { }

  ngOnInit(): void {

    if(localStorage.getItem('qrcode') != null){
      this.qrcode = JSON.parse(localStorage.getItem('qrcode') as string)
    }
  }

}
