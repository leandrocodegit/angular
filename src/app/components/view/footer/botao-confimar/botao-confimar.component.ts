import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { PagamentoService } from 'src/app/services/pagamento/PagamentoService';

@Component({
  selector: 'spa-botao-confimar',
  templateUrl: './botao-confimar.component.html',
  styleUrls: ['./botao-confimar.component.css']
})
export class BotaoConfimarComponent implements OnInit {

  @Output() eventConfirmarSim = new EventEmitter() 
  @Output() eventConfirmarNao = new EventEmitter()

  constructor(
    private pagamentoService: PagamentoService,  
    private bottomSheet: MatBottomSheet,    
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  sim(){
   this.eventConfirmarSim.emit()  
  }

  nao(){
    this.eventConfirmarNao.emit()
    this.bottomSheet.dismiss()    
  } 

}
