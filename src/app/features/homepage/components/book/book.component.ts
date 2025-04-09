import { Component, inject, Input } from '@angular/core';
import { Book } from '../../../../shared/models/book.model';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { BookService } from '../../services/book.service';
import { NgIf } from '@angular/common';
import { PaginationFilter } from '../../../../shared/models/pagination-filter.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book',
  imports: [PrimaryButtonComponent, NgIf],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

  @Input() book!: Book

  bookService = inject(BookService);

  private paginationFilters!: PaginationFilter;

  constructor() {
    this.bookService.paginationFilters$.pipe(takeUntilDestroyed())
    .subscribe({next: (paginationFilters)=> this.paginationFilters = paginationFilters})
  }

  toggleFavorite() {
    this.bookService.updateBook({ ...this.book, isFavorite: !this.book.isFavorite })
      .subscribe({
        next: (res) => {
          //res - updatd boook  
          this.bookService.loadBooks(this.paginationFilters).subscribe()
        },
        error: (err) => {
          console.error('Ошибка при обновлении:', err);
        }
      });
  }

}
