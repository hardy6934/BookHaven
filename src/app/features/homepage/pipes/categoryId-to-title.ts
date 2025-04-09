import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../../shared/models/category.model';

@Pipe({
  name: 'categoryIdToTitle'
})
export class CategoryIdToTitle implements PipeTransform {
  transform(categoryId: string, categories: Category[]): string {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.title : 'Unknown';
  }
}