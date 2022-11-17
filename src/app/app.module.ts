import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/view/footer/footer.component';
import { ProdutoComponent } from './components/view/produto/produto.component';
import { MatBottomSheetModule} from '@angular/material/bottom-sheet'; 
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SheetComponent } from './components/view/sheet/sheet.component';
import { MatListModule} from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import { FormaPagamentoComponent } from './components/pagamento/forma-pagamento/forma-pagamento.component';
import { CarrinhoComponent } from './components/view/carrinho/carrinho.component'; 
import { CardComponent } from './components/pagamento/card/card.component'; 
import { CadastroComponent } from './components/view/cadastro/cadastro.component';
import { HttpClientModule } from '@angular/common/http'; 
import { StatusComponent } from './components/pedido/status/status.component';
import { TopComponent } from './components/view/top/top.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PedidosComponent } from './components/pedido/list/pedidos.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';      
import { ConfirmComponent } from './components/pagamento/confirm/confirm.component';
import { DetalhesPedidoComponent } from './components/pedido/detalhes-pedido/detalhes-pedido.component';
import { BotaoEnviarComponent } from './components/view/footer/botao-enviar/botao-enviar.component';
import { MoedaPipe } from './pipes/moeda.pipe';  
import { BotaoConfimarComponent } from './components/view/footer/botao-confimar/botao-confimar.component';
import { EnderecoPipe } from './pipes/endereco.pipe';
import { DevolucaoComponent } from './components/pedido/devolucao/devolucao.component'; 
import { PixComponent } from './components/pagamento/pix/pix.component';
import { QrCodeComponent } from './components/scanner/scan-camera/qr-code.component'; 
import { AuthGuard } from './components/social/login/auth.guard';
import { LoginComponent } from './components/social/login/login.component';
import { LoadComponent } from './components/view/load/load.component'; 
import { DetalhesProdutoComponent } from './components/view/produto/detalhes-produto/detalhes-produto.component';
import { Cadastro2Component } from './components/view/cadastro2/cadastro2.component';  
import { Card2Component } from './components/pagamento/card2/card2.component';
import { ParcelasPipe } from './pipes/parcelas.pipe';
import { JurosPipe } from './pipes/juros.pipe';
import { MaterialComponent } from './material/material.component';

   
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ProdutoComponent,
    SheetComponent,
    FormaPagamentoComponent,
    CardComponent,
    CarrinhoComponent,
    PixComponent,
    CadastroComponent,    
    StatusComponent,
    TopComponent,
    PedidosComponent,
    LoginComponent, 
    QrCodeComponent,
    ConfirmComponent,
    DetalhesPedidoComponent,
    BotaoEnviarComponent,
    MoedaPipe, 
    BotaoConfimarComponent,
    EnderecoPipe,
    DevolucaoComponent,
    LoadComponent, 
    DetalhesProdutoComponent, 
    Cadastro2Component,
    Card2Component,
    ParcelasPipe,
    JurosPipe,
    MaterialComponent
   
  ],
  entryComponents:[],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatBottomSheetModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatGridListModule,
    BrowserAnimationsModule    
    
  ],
  providers: [ AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
