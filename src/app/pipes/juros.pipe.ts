import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'juros'
})
export class JurosPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return this.juros(value);
  }

  public juros(valor: number): string{ 
    return "Juros " + valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }) + "%" 
 }

}
