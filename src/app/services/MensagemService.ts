import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { SheetComponent } from "../components/view/sheet/sheet.component";


@Injectable({
    providedIn: 'root'
})
export class MensagemService {

    constructor(private _bottomSheet: MatBottomSheet) { }

    mensage: string[] = []
    private isExecute = false

    sendMesage(msg: string[], isRetardo: boolean, isForce: boolean, time: number) {
        this.mensage = msg
        if(isRetardo){
           var interval = setInterval(() => {
                this.notifique(msg, time, isForce)
                clearInterval(interval)
            }, 1000)
        }else{
            this.notifique(msg, time, isForce)
        }
     }

    private notifique(msg: string[], time: number, isForce: boolean){
        var interval = {} as any
        
        if (!this.isExecute) { 
            this.isExecute = true           
            this._bottomSheet.open(SheetComponent)
            console.log("Execute " + this.isExecute + " time " + time + " mensagem: " + this.mensage)  
             interval = setInterval(() => {
                this._bottomSheet.dismiss(SheetComponent) 
                this.isExecute = false
                clearInterval(interval)
            }, time)
        }
        else{
            if(isForce && this.isExecute){
                console.log("Execute forçado ...")
                clearInterval(interval) 
                this._bottomSheet.dismiss(SheetComponent)
                this.isExecute = false                
                this.notifique(msg, time, false)
            }
        }
    }
}