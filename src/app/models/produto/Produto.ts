import { Imagem } from "../qrcode/Imagem"; 
import { Estoque } from "./Estoque";

export interface Produto{
     codigo: String,
     descricao: String,
     marca: String,
     estoque: Estoque,
     imageOriginal: Imagem,
     largura: number, 
     altura: number, 
     profundidade: number, 
     unidadeMedida: String, 
     pesoBruto: number,
     material: string
}