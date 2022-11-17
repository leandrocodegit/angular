import { Usuario } from "./usuario/Usuario";

 

export class User {

    constructor()
    constructor(
        id: string,
        name: string,
        picture: any,
        email: string)

    constructor(
        name: string,
        picture: any,
        email: string,
        aud: string,
        azp: string,
        email_verified: boolean,
        family_name: string,
        given_name: string,
        iat: string,
        iss: string,
        jti: string,
        nbf: string,
        sub: string,
        cadastro: Usuario)

    constructor(
        public name?: string,
        public picture?: any,
        public email?: string,
        public aud?: string,
        public azp?: string,
        public email_verified?: boolean,
        public family_name?: string,
        public given_name?: string,
        public iat?: string,
        public iss?: string,
        public jti?: string,
        public nbf?: string,
        public sub?: string,
        public cadastro?: Usuario) {

    }
}