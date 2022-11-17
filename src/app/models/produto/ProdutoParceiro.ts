import { Estoque } from "./Estoque";

export interface ProdutoParceiro{
     codigo: String,
     descricao: String,
     marca: String,
     estoque: Estoque,
     imageOriginal: String,
     imageThumbnail: String
}