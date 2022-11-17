import { EmbeddedPix } from "./EmbeddedPix";

export class PaymentPointOfInteraction{
    constructor(
        public transaction_data: EmbeddedPix = new EmbeddedPix){}
}