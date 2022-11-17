import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';    
import { AuthGuard } from './components/social/login/auth.guard';
import { LoginComponent } from './components/social/login/login.component';
import { CadastroComponent } from './components/view/cadastro/cadastro.component';
import { Cadastro2Component } from './components/view/cadastro2/cadastro2.component';
import { CarrinhoComponent } from './components/view/carrinho/carrinho.component';  
import { MaterialComponent } from './material/material.component';
const routes: Routes = [
  
  { path: '', component: MaterialComponent } ,
  { path: 'login', component: LoginComponent } ,   
  { path: 'login/:credential', component: LoginComponent } ,
  { path: 'auth', component: LoginComponent } ,
  { path: 'cart', component: CarrinhoComponent } ,
  { path: 'cadastro', component: Cadastro2Component, canActivate:[AuthGuard]} ,   
  { path: 'checkout', loadChildren: () => import('./components/pagamento/pagamento.module').then(m => m.PagamentoModule),
  canActivate:[AuthGuard] }, 
  { path: 'pedido', loadChildren: () => import('./components/pedido/pedido.module').then(m => m.PedidoModule)
  ,
  canActivate:[AuthGuard]  }, 
  { path: 'scan', loadChildren: () => import('./components/scanner/scanner.module').then(m => m.ScannerModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: "enabled"
    //scrollPositionRestoration: "enabled"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
