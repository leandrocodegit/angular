import { Pipe, PipeTransform } from '@angular/core';
import { Parcela } from '../models/checkouts/Parcela';
import { MoedaPipe } from './moeda.pipe';

@Pipe({
  name: 'parcelas'
})
export class ParcelasPipe implements PipeTransform {

  transform(value: Parcela, ...args: unknown[]): unknown {
    var v: MoedaPipe = new MoedaPipe
    return value.parcelas + "x de " + v.transform(value.valorParcela);
  }

}
