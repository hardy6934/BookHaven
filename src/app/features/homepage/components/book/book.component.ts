import { Component, inject, Input } from '@angular/core';
import { Book } from '../../../../shared/models/book.model';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { BookService } from '../../services/book.service';
import { NgIf } from '@angular/common';
import { PaginationFilter } from '../../../../shared/models/pagination-filter.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { DialogBookContentComponent } from '../dialog-book-content/dialog-book-content.component';
import { Category } from '../../../../shared/models/category.model';
import { CategoryIdToTitle } from '../../pipes/categoryId-to-title';

@Component({
  selector: 'app-book',
  imports: [PrimaryButtonComponent, NgIf, CategoryIdToTitle],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

  @Input() book!: Book
  @Input() categories!: Category[]
  dialog = inject(MatDialog);

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
          //res - updated boook  
          this.bookService.loadBooks(this.paginationFilters).subscribe()
        },
        error: (err) => {
          console.error('Ошибка при обновлении:', err);
        }
      });
  }


  openModal(mode: string) {
      const dialogRef = this.dialog.open(DialogBookContentComponent, {
        data: { mode, book: this.book }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          switch (mode) {
            case 'edit':
              this.bookService.updateBook(result).subscribe({
                next: () => {
                  alert('Категория обновлена');
                  this.bookService.loadBooks().subscribe();
                },
                error: (err) => alert(`Ошибка: ${err.message}`)
              });
              break;
            case 'delete':
              if (result === true) {
                this.bookService.removeBook(this.book).subscribe({
                  next: () => {
                    alert('Категория удалена');
                    this.bookService.loadBooks().subscribe()
                  },
                  error: (err) => alert(`Ошибка: ${err.message}`)
                });
              }
              break;
          }
        }
      });
    }

}
