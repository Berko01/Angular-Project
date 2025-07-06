import { Pipe, PipeTransform } from '@angular/core';
import { ProductModel } from '../core/model/product';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {
  transform(value: ProductModel[], filterText?: string): ProductModel[] {
    if (!value) return [];

    const filter = filterText ? filterText.toLowerCase() : '';

    return filter
      ? value.filter(p => p.name.toLowerCase().includes(filter))
      : value;
  }
}

