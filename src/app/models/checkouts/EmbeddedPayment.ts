import { EmbeddedCard } from "./EmbeddedCard"

export interface EmbeddedPayment{
 
     id: number
     dateCreated: Date
     dateApproved: Date
     dateLastUpdated: Date
     dateOfExpiration: Date
     moneyReleaseDate: Date
     moneyReleaseSchema: string
     operationType: string
     issuerId: string
     paymentMethodId: string
     paymentTypeId: string
     status: string
     statusDetail: string
     currencyId: string
     description: string
     transactionAmount: number
     transactionAmountRefunded: number
     couponAmount: number
     installments: number
     embeddedCard: EmbeddedCard

}