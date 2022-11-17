import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoComponent } from './pedido.component';
import { List2Component } from './list2/list2.component';


@NgModule({
  declarations: [
    PedidoComponent,
    List2Component
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule
  ]
})
export class PedidoModule { }
