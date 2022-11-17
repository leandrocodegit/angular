import { Component, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'spa-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit, OnDestroy {

  heroForm: FormGroup = {} as FormGroup
  endereco = {} as Endereco
  usuario: Usuario = new Usuario
  user: User = {} as User
  nameButton = 'Continuar'
  color = "black"
  isOpens = true
  isLoad = false
  isLetras = false
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
      }

      this.usuarioService.buscaUsuario().subscribe(result => {
        this.usuario = result
        this.endereco = result.endereco_principal
        localStorage.setItem('usuario', JSON.stringify(result))
        this.validate('cepcpf')
        this.isLoad = false
      }, () => {
        this.endereco = new Endereco
        this.usuario.email = localStorage.getItem('email') as string
        this.validate('cepcpf')
        this.isLoad = false
      })   

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
      cpf: new FormControl(this.usuario.documento, [Validators.required, Validators.pattern('[0-9]{1}[0-9][0-9]{9}')]),
      cep: new FormControl(this.usuario.endereco_principal.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      logradouro: new FormControl(this.usuario.endereco_principal.logradouro, [Validators.required, Validators.minLength(3)]),
      numero: new FormControl(this.usuario.endereco_principal.numero, [Validators.required, Validators.minLength(1)]),
      bairro: new FormControl(this.usuario.endereco_principal.bairro, [Validators.required, Validators.minLength(3)]),
      localidade: new FormControl(this.usuario.endereco_principal.localidade, [Validators.required, Validators.minLength(3)]),
      uf: new FormControl(this.usuario.endereco_principal.uf, [Validators.required, Validators.minLength(1)])
    })

    console.log()
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
  }

  alterar() {
    console.log("Alterar...")
  }

}
