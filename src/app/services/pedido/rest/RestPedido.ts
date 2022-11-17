import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseCheckout } from "src/app/models/checkouts/ResponseCheckout";
import { LoginService } from "../../LoginService"; 
import { Usuario } from "../../../models/usuario/Usuario";
import { UsuarioService } from "../../usuario/UsuarioService"; 
import { PedidoService } from "../PedidoService";
import { PaymentResponse } from "src/app/models/checkouts/response/PaymentResponse";
import { Pedido } from "src/app/models/pedidos/Pedido";
import { PedidoRequestPayment } from "src/app/models/pedidos/request/PedidoRequestPayment";
import { PedidoResponse } from "src/app/models/pedidos/response/PedidoResponse"; 
import { HEADERS, HOST } from "src/app/models/enuns/BEARER";

@Injectable({
  providedIn: 'root'
})
export class RestPedido {

  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService) {
  }

  responsePay = {} as Pedido

  gerarRegistro(): Observable<any> {
    return this.httpClient.get<any>(HOST + "/pedido/registro", HEADERS)
  }

  salvarPedido(pedido: Pedido): Observable<Pedido> {
    return this.httpClient.post<Pedido>(HOST + "/pedido" , JSON.stringify(pedido), HEADERS)
  }

  salvarPedidoECriarPix(pedido: Pedido): Observable<Pedido> {
    return this.httpClient.post<Pedido>(HOST + "/pedido/pix" , JSON.stringify(pedido), HEADERS)
  }

  registrarPedidoPix(pedido: Pedido): Observable<Pedido> {
    var user: Usuario = JSON.parse(localStorage.getItem('usuario')!)
    pedido.usuario = user 
    pedido = this.pedidoService.atualizaPedido(pedido)
    return this.httpClient.post<Pedido>(HOST + "/pedido", JSON.stringify(pedido), HEADERS)
  }

  atualizaPedidoEstoque(pedido: Pedido): Observable<Pedido> {
    return this.httpClient.put<Pedido>(HOST + "/pedido/update/estoque", JSON.stringify(pedido), HEADERS)
  }

  atualizaPedidoItens(pedido: Pedido): Observable<Pedido> {
    return this.httpClient.put<Pedido>(HOST + "/pedido/update/itens", JSON.stringify(pedido), HEADERS)
  }

  criarPedido(pedido: Pedido): Observable<Pedido> {
    return this.httpClient.post<Pedido>(HOST + "/pedido", JSON.stringify(pedido), HEADERS)
  }

  registrarDevolucaoPedido(pedido: Pedido): Observable<Pedido> {
    return this.httpClient.post<Pedido>(HOST + "/pedido/devolucao", JSON.stringify(pedido), HEADERS)
  }

  buscarPedido(numeroPedido: string): Observable<Pedido> {
    console.log("Buscando " + numeroPedido)
    return this.httpClient.get<Pedido>(HOST + "/pedido/" + numeroPedido, HEADERS)
  }

  buscarPedidoPagamento(numeroPedido: string): Observable<Pedido> {
    console.log("Buscando " + numeroPedido)
    return this.httpClient.get<Pedido>(HOST + "/pedido/pay/" + numeroPedido, HEADERS)
  }

  listPedidos(): Observable<Pedido[]> {
    var user: Usuario = JSON.parse(localStorage.getItem('usuario')!)
    return this.httpClient.get<Pedido[]>( HOST + "/pedido/user/" + user.email, HEADERS)
  }
}