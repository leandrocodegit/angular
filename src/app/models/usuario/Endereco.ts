export class Endereco{ 

    constructor(
        public cep?: string,
        public logradouro: string = "",
        public numero: string = "", 
        public complemento: string = "",
        public bairro: string = "",
        public localidade: string = "",
        public uf: string = "", 
        public ddd: string = "", 
    ){}
    
}