import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { EnderecoService } from 'src/app/services/EnderecoService';
import { Usuario } from 'src/app/models/usuario/Usuario';
import { UsuarioService } from 'src/app/services/usuario/UsuarioService';
import { Endereco } from 'src/app/models/usuario/Endereco';
import { ConfirmComponent } from '../../pagamento/confirm/confirm.component';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewportScroller } from '@angular/common';
import { MDCTextField } from '@material/textfield';
import { MDCSelect } from '@material/select';
import { GenericValidator } from './GenericValidator';

declare var exports: any

@Component({
  selector: 'spa-cadastro2',
  templateUrl: './cadastro2.component.html',
  styleUrls: ['./cadastro2.component.scss', './cadastro2.component.css']
})
export class Cadastro2Component implements OnInit {



  heroForm: FormGroup = {} as FormGroup
  endereco = {} as Endereco
  usuario: Usuario = new Usuario
  user: User = {} as User
  nameButton = 'Continuar'
  color = "black"
  isOpens = true
  isLoad = false
  isLetras = false
  isViewIcons = true
  isValidCPF = false
  alerta = 0
  private isValidCadastro = false
  private numero = ""

  constructor(
    private enderecoService: EnderecoService,
    private usuarioService: UsuarioService,
    private bottomSheet: MatBottomSheet,
    private viewPortscroller: ViewportScroller,
    private router: Router
  ) { }

  ngOnInit(): void {

    

    this.nameButton = "Aguarde..."
    if (localStorage.getItem('cadastro') != null) {
      if (localStorage.getItem('cadastro') == 'confirmado')
        this.router.navigate(["/checkout"])
    }else{
      this.initFieds() 
    this.usuarioService.buscaUsuario().subscribe(result => {

      this.usuario = result
      this.endereco = result.endereco_principal
      localStorage.setItem('usuario', JSON.stringify(result))
      this.validate('cepcpf')
      this.isLoad = false
      var interval = setInterval(() => {
        var foos = [].map.call(document.querySelectorAll('.mdc-text-field'), function (el) {
          return new MDCTextField(el);
        });
        const select = new MDCSelect(document.querySelector('.mdc-select')!);
        select.setValue("SP")
        clearInterval(interval)
      }, 500)

    }, () => {
      this.endereco = new Endereco
      this.usuario.email = localStorage.getItem('email') as string
      this.validate('cepcpf')
      this.isLoad = false
      this.initFieds()
    })
  }
  }

  private initFieds() {
    var interval = setInterval(() => {
      var foos = [].map.call(document.querySelectorAll('.mdc-text-field'), function (el) {

        return new MDCTextField(el);
      });
      const select = new MDCSelect(document.querySelector('.mdc-select')!); 
      clearInterval(interval)
    }, 500)

    window.addEventListener('click', (event) => {
      this.isFocusAllFields();
    });
  }

  ngOnDestroy(): void {
    this.bottomSheet.dismiss()
  }

  buscaCep(cep: string) {
    this.alerta = 3
    if (cep.length == 8)
      this.enderecoService.findAddressByCep(cep).subscribe(result => {
        this.usuario.endereco_principal = this.endereco = result
        this.usuario.endereco_principal.cep = this.usuario.endereco_principal.cep?.replace("-", "")
        const select = new MDCSelect(document.querySelector('.mdc-select')!);
        select.setValue(result.uf)
        
        this.initFieds()
        this.validate('cep')
      })

  }

  enviar() {

    if (this.isValidCadastro) {
      console.log("validado " + JSON.stringify(this.usuario))
      localStorage.setItem('usuario', JSON.stringify(this.usuario))
      if (this.nameButton == "Confirmar dados") {
        this.usuarioService.atualizarUsuario(this.usuario).subscribe(result => {
          localStorage.setItem('cadastro', 'confirmado')
          this.nameButton = "Continuar"
          this.color = "black"
          this.bottomSheet.dismiss()
          this.alerta = 0
        })
        this.router.navigate(["/checkout"])
      } else this.openSheet()
    } else {
      this.alerta = 2
      this.nameButton = "Preencha o formulário"
    }
  }

  openSheet(): void {
    this.bottomSheet.open(ConfirmComponent)
    this.nameButton = "Confirmar dados"
  }

  validate(element: string) {
    this.heroForm = new FormGroup({
      nome: new FormControl(this.usuario.nome, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]),
      contato: new FormControl(this.usuario.contato, [Validators.required, Validators.pattern('[1-9]{1}[0-9][0-9]{9}')]),
      cpf: new FormControl(this.usuario.documento, [Validators.required, Validators.pattern('[0-9]{1}[0-9][0-9]{9}'), GenericValidator.isValidCpf()]),
      cep: new FormControl(this.usuario.endereco_principal.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      logradouro: new FormControl(this.usuario.endereco_principal.logradouro, [Validators.required, Validators.minLength(3)]),
      numero: new FormControl(this.usuario.endereco_principal.numero, [Validators.required, Validators.minLength(1)]),
      bairro: new FormControl(this.usuario.endereco_principal.bairro, [Validators.required, Validators.minLength(3)]),
      localidade: new FormControl(this.usuario.endereco_principal.localidade, [Validators.required, Validators.minLength(3)]),
      uf: new FormControl(this.usuario.endereco_principal.uf, [Validators.required, Validators.minLength(1)])
    })


    this.isValidCPF = this.heroForm.get('cpf')?.valid!

    if (element == "numero")
      this.numero = this.usuario.endereco_principal.numero

    if (this.heroForm.get('contato')?.valid && element.includes('contato')) {
      this.viewPortscroller.scrollToAnchor("celular");
      document.getElementById('cpf')?.focus()
    }
    else if (this.heroForm.get('cpf')?.valid && element.includes('cpf')) {
      this.viewPortscroller.scrollToAnchor("endereco");
      document.getElementById('cep')?.focus()
    }
    else if (this.heroForm.get('cep')?.valid && element.includes('cep')) {
      this.viewPortscroller.scrollToAnchor("cep");
      document.getElementById('numero')?.focus()
    }
    if (this.heroForm.valid) {
      this.color = "black"
      this.alerta = 1
      this.nameButton = "Continuar"
    }
    else {
      this.alerta = 2
      this.nameButton = "Preencha o formulário"
    }

    this.isValidCadastro = this.heroForm.valid
    this.isFocusAllFields()

  }





  isFocusAllFields() {
    var foos = document.querySelectorAll('input')
    for (let index = 0; index < foos.length; index++) {
      const elem = foos[index]; 
      if (elem === document.activeElement) {
        if (!this.isValidCadastro) {
          this.isViewIcons = false
          break;
        } else {
          this.isViewIcons = true
          break
        }
      } else {
        this.isViewIcons = true
      }
    } 
  }

  setLetras() {
    this.isLetras = !this.isLetras
  }

  alterar() {
    console.log("Alterar...")
  }

}

