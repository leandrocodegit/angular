import { Identification } from "./Identification"

export class Payer {
    email: string
    identification: Identification

    constructor(email: string,
        identification: Identification) {

        this.email = email
        this.identification = identification
    }


}