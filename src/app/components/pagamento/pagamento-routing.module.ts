import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { Card2Component } from './card2/card2.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { FormaPagamentoComponent } from './forma-pagamento/forma-pagamento.component'; 
import { PixComponent } from './pix/pix.component';

const routes: Routes = [
  { path: '', component: FormaPagamentoComponent },
  { path: 'confirm', component: ConfirmComponent},
  { path: 'card', component: Card2Component },
  { path: 'pix', component: PixComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentoRoutingModule { }
