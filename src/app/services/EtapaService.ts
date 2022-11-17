
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class EtapaService {

    constructor(
        private router: Router
    ) { }

    saveEtapa(etapa: string, nextURL: string) {

        console.log('Etapa ' + localStorage.getItem('etapa'))
        console.log('NextURL ' + localStorage.getItem('nextURL'))        

        if (localStorage.getItem('etapa') == null || localStorage.getItem('nextURL') == null) {
            localStorage.setItem('etapa', etapa)
            localStorage.setItem('nextURL', nextURL)
        }
        else {
            localStorage.setItem('etapa', etapa)
            localStorage.setItem('nextURL', nextURL)
        } 

        console.log('Etapa ' + localStorage.getItem('etapa'))
        console.log('Etapa ' + localStorage.getItem('nextURL'))

        this.processEtapa()

    }

    processEtapa(){
       
          if (localStorage.getItem('etapa') == 'cart') { 
            if (localStorage.getItem('isLogado') == 'false'){
                this.router.navigate(['/login']);
            }
        }
        else if (localStorage.getItem('etapa') == 'pagamento') { 
            if (localStorage.getItem('isLogado') == 'false')
                this.router.navigate(['/login']);
            } 

        this.router.navigate([localStorage.getItem('nextURL') as string]);

    }

}