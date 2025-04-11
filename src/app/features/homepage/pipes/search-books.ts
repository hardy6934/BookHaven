import { Pipe, PipeTransform } from '@angular/core'; 
import { Book } from '../../../shared/models/book.model';

@Pipe({
  name: 'searchBooks'
})
export class SearchBooks implements PipeTransform {
  transform(books: Book[] | null, search: string): Book[] | null {
    if (!books) return null; 
    if (!search || search.trim() === "") return books; 
    
    return books.filter(book => book.title.toLowerCase().includes(search.toLowerCase()));
          
  }
}