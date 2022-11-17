import { PaymentPointOfInteraction } from "../../checkouts/PaymentPointOfInteraction";


export interface Pagamento{ 
          id: string,
          paymentMethodId: string,
          paymentTypeId: string,
          status: string,
          statusDetail: String,
          transactionAmount: number,
          installments: number,
          pointOfInteraction: PaymentPointOfInteraction
  

}