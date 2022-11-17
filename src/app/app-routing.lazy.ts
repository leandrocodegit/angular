import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
 

const routes: Routes = [
 
  {
    path: 'scan',
    loadChildren: () => import('./components/scanner/scan-camera/qr-code.component').then(m => m.QrCodeComponent)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/social/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/social/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'login/:credential',
    loadChildren: () => import('./components/scanner/scan-camera/qr-code.component').then(m => m.QrCodeComponent)
  },
  {
    path: 'cart',
    loadChildren: () => import('./components/view/carrinho/carrinho.component').then(m => m.CarrinhoComponent)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./components/view/cadastro/cadastro.component').then(m => m.CadastroComponent)
  },
  {
    path: 'pagamento',
    loadChildren: () => import('./components/pagamento/forma-pagamento/forma-pagamento.component').then(m => m.FormaPagamentoComponent)
  },
  {
    path: 'pagamento/confirm',
    loadChildren: () => import('./components/pagamento/confirm/confirm.component').then(m => m.ConfirmComponent)
  }
  ,
  {
    path: 'pagamento/card',
    loadChildren: () => import('./components/pagamento/card/card.component').then(m => m.CardComponent)
  }
  ,
  {
    path: 'pagamento/pix',
    loadChildren: () => import('./components/pagamento/pix/pix.component').then(m => m.PixComponent)
  }
  ,
  {
    path: 'pedido/list',
    loadChildren: () => import('./components/pedido/list/pedidos.component').then(m => m.PedidosComponent)
  },
  {
    path: 'pedido/status',
    loadChildren: () => import('./components/pedido/status/status.component').then(m => m.StatusComponent)
  },
  {
    path: 'pedido/status/:id',
    loadChildren: () => import('./components/pedido/status/status.component').then(m => m.StatusComponent)
  }
  ,
  {
    path: 'devolucao/:id',
    loadChildren: () => import('./components/pedido/devolucao/devolucao.component').then(m => m.DevolucaoComponent)
  } 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
