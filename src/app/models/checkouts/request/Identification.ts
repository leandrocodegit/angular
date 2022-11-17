export class Identification {
    identificationType: string
    identificationNumber: string

    constructor(identificationType: string,
        identificationNumber: string
    ) {
        this.identificationType = identificationType
        this.identificationNumber = identificationNumber
    }
}