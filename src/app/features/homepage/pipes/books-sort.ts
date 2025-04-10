import { Pipe, PipeTransform } from '@angular/core'; 
import { Book } from '../../../shared/models/book.model';

@Pipe({
  name: 'booksSort'
})
export class BooksSort implements PipeTransform {
  transform(books: Book[] | null, sortType: string): Book[] | null {  
    if(!sortType || !books) return books
   
    const sortedBooks = [...books]; 

    switch(sortType)
    {
        case "author": {
          return sortedBooks.sort((a, b) => a.author.localeCompare(b.author)); 
        }
        case "title": {
          return sortedBooks.sort((a, b) => a.title.localeCompare(b.title)); 
        }
        default: return books;
    }
 
    
  }
}