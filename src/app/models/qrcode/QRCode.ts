 
import { Imagem } from "./Imagem";
import { Parceiro } from "./Parceiro";
import { Produto } from "../../models/produto/Produto"; 
import { Status } from "../enuns/Status";

export interface QRCode{
     id: String,
     codigo: number,
     preco: number,
     parceiro: Parceiro,
     produto: Produto,
     desconto: number,
     multi_desconto: boolean,
     status: Status,     
}