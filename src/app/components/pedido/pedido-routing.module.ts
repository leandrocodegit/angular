import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevolucaoComponent } from './devolucao/devolucao.component';
import { PedidosComponent } from './list/pedidos.component';
import { StatusComponent } from './status/status.component'; 

const routes: Routes = [
  { path: '', component: PedidosComponent },
  { path: 'status', component: StatusComponent },
  { path: 'status/:id', component: StatusComponent },
  { path: 'devolucao/:id', component: DevolucaoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
