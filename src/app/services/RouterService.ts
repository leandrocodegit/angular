 
import { Injectable } from "@angular/core"; 

@Injectable({
    providedIn: 'root'
})
export class RouterService {

    constructor() { }

    previosPage = "/"    

    savePreviosPage(page: string){
        console.log('Save page router url ' + page)
        this.previosPage = page
    }
 
}