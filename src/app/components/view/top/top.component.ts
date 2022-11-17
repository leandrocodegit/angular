import { STRING_TYPE } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Parceiro } from 'src/app/models/produto/Parceiro';
import { User } from 'src/app/models/User'; 

declare var FB: any
var navigate: Router

@Component({
  selector: 'spa-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  nome?: string = '';
  picture?: string = '';
  total?: string = '4952.98';
  isVisible = true; 
  isViewParceiro = false
  @Input() setViewParceiro = true
  parceiro: Parceiro = {} as Parceiro

  user: User = {} as User

  constructor(private route: Router) {
    navigate = route 
   }

  ngOnInit(): void {
 
      
    if(localStorage.getItem('parceiro') != null){
      this.setParceiro()
    } else{
      var interval = setInterval(() => { 
        this.setParceiro()
        if(localStorage.getItem('parceiro') != null)
          clearInterval(interval)
      }, 1000)
    }
    
    this.isViewParceiro = this.setViewParceiro
    
    this.isVisible = true;
    if (localStorage.getItem('isLogado') === 'true') {
      this.picture = 'assets/img/sign.png'; 
      this.user = JSON.parse(localStorage.getItem('user')!)
      if (this.user != null) {
        this.nome = this.user.given_name
        this.isVisible = true 
        this.picture = 'assets/img/sign.png'; 
        if (typeof this.user.picture != "string") {
          //this.picture = this.user.picture.data.url
          this.picture = 'assets/img/sign.png'; 
          this.nome = this.user.name?.split(' ')[0] 
        }
        else {
          //this.picture = this.user.picture
        }
      }
    }
    else {
      this.picture = 'assets/img/login.png';
      this.isVisible = false
    }    
  }

  private setParceiro(){
    if(localStorage.getItem('parceiro') != null){
      this.parceiro = JSON.parse(localStorage.getItem('parceiro')!)
      this.isViewParceiro = true 
    }  
  }


  sair() {
    FB.init({
      appId: '322371943411039',
      version: 'v14.0',
      cookie: true
    });
    FB.getLoginStatus(function (response: any) {
      if (response && response.status === 'connected') {
        FB.logout(function (response: any) {
          console.log('Logout ' + response)
        });
      }
    });
     
    localStorage.setItem("isLogado", "false") 
    localStorage.clear()
    navigate.navigate(["/cart"])
    console.log('Logout ' + localStorage.getItem('isLogado') ) 
  }

  meuCadastro(){
    localStorage.removeItem('cadastro')
    this.route.navigate(["/cadastro"])
  }

}
