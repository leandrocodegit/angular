import { Endereco } from "./Endereco";

export class Usuario{ 

    constructor(
        public email: string = "",
        public nome: string = "",
        public contato: string = "",
        public tipoDocumento: String = "",
        public documento: string = "", 
        public endereco_principal: Endereco = new Endereco

    ){}    
} 