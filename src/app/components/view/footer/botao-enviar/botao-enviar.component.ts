import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'spa-botao-enviar',
  templateUrl: './botao-enviar.component.html',
  styleUrls: ['./botao-enviar.component.css']
})
export class BotaoEnviarComponent implements OnInit {

  @Input() name: string = ""
  @Output() eventButton = new EventEmitter()
  @Input() eventReceiv = new EventEmitter
  @Input() color: string = "black" 
  @Input() alerta: number = 0

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {}

  navigate() {
    this.eventButton.emit() 
  } 

}
