import { Identification } from "./Identification"

export class Payer { 
    constructor(
        public email: string = "",
        public nome: String = "", 
        public tipoDocumento: String = "",
        public documento: string = ""
    ){} 

}