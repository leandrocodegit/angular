import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moeda'
})
export class MoedaPipe implements PipeTransform {

  transform(value: number,  ...args: unknown[]): unknown {
    if(value != null && value > 0)
      return this.subtotal(value);
    return '0'  
  }

  public subtotal(preco: number): string{ 
    return  'R$' + preco.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) 
 }

}
