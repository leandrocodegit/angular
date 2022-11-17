import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from '../view/produto/produto.component'; 
import { QrCodeComponent } from './scan-camera/qr-code.component';
import { ScannerComponent } from './scanner.component';

const routes: Routes = [
  { path: '', component: QrCodeComponent },
  { path: ':qrcode', component: ProdutoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScannerRoutingModule { }
