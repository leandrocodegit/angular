import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagamentoRoutingModule } from './pagamento-routing.module';
import { PagamentoComponent } from './pagamento.component'; 


@NgModule({
  declarations: [
    PagamentoComponent 
  ],
  imports: [
    CommonModule,
    PagamentoRoutingModule
  ]
})
export class PagamentoModule { }
