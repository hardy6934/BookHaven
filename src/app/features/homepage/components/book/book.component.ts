import { Component, inject, Input } from '@angular/core';
import { Book } from '../../../../shared/models/book.model';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book',
  imports: [PrimaryButtonComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

  @Input() book!: Book

  bookService = inject(BookService);

  
  toggleFavorite() { 
    this.book.isFavorite = !this.book.isFavorite;
    this.bookService.updateBook(this.book)
      .subscribe({
        next: () => {
          this.bookService.loadBooks().subscribe() 
        },
        error: (err) => {
          console.error('Ошибка при обновлении:', err);
        }
      });
  }
 
}
