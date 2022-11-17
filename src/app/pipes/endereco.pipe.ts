import { Pipe, PipeTransform } from '@angular/core';
import { Endereco } from '../models/usuario/Endereco';

@Pipe({
  name: 'endereco'
})
export class EnderecoPipe implements PipeTransform {

  transform(value: Endereco, ...args: unknown[]): unknown {
    return this.format(value);
  }

  public format(endereco: Endereco): string{ 
    if(endereco == null)
      return ""
    return endereco.logradouro + ' ' 
    + endereco.numero + ' ' 
    + endereco.complemento + ' ' 
    + endereco.bairro + ', ' 
    + endereco.localidade + ' - '
    + endereco.uf ;
    } 

}
