import { Component, OnDestroy, OnInit, } from '@angular/core';
import {  Router } from '@angular/router';
import { User } from 'src/app/models/User'; 
import { RouterService } from 'src/app/services/RouterService';  
import { LoginService } from 'src/app/services/LoginService';
import { CLIENT_ID } from 'src/app/models/enuns/BEARER';
import { AuthService } from './AuthService';
import { AuthGuard } from './auth.guard';


declare var FB: any
declare var google: any
declare var jwt: any
let navigate: Router
var isDestroy = false  

@Component({
  selector: 'spa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit, OnDestroy {

  user: User = {}
  interval = {} as any
  isDestroy = false
  
  
  constructor(
    private router: Router,
    private routerService: RouterService 
  ) { }

  ngOnInit(): void {
    isDestroy = this.isDestroy
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      //client_id: "731978274268-fav8gquqd3gck12p9lh9nlhglmadce4v.apps.googleusercontent.com",
      // client_id: "731978274268-laoh10g44o61u706qo9vn1mtdv8knk1h.apps.googleusercontent.com",
      context: "signin",
      auto_select: "true",
      ux_mode: "popup",
      callback: this.handleCredentialResponse

    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {
        type: "standard",
        shape: "pill",
        theme: "filled_black",
        text: "$ {button.text}",
        size: "large",
        logo_alignment: "center",
        width: "250"

      }
    );
    google.accounts.id.prompt();

    FB.init({
      appId: '322371943411039',
      version: 'v14.0',
      coockie: true
    }); 
    this.routerService.savePreviosPage(this.router.url)
    FB.XFBML.parse()

  }
  ngOnDestroy(): void {  
  }


  public handleCredentialResponse(response: any) {
 
    var credential = response.credential
    var base64Url = credential.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var payload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    this.user = JSON.parse(payload)
    if (this.user != null) {
      localStorage.setItem("isLogado", "true")
      localStorage.setItem("type", "google")
      localStorage.setItem("token", credential)
      localStorage.setItem("user", JSON.stringify(this.user))
      localStorage.setItem("name", this.user.name!)
      localStorage.setItem("email", this.user.email!)  
      document.getElementById('eventBT')!.click()      
    }
  }
 



  redirect() {
    if (localStorage.getItem('isLogado') == 'true') {
      this.router.navigate(['/cadastro']) 
    }
  }

  enviar() {
    this.router.navigate(["/cart"])
  }
}


