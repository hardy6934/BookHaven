import { Component, inject } from '@angular/core';
import { BookService } from '../services/book.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookComponent } from './book/book.component';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';
import { BookFilter } from '../../../shared/models/book-filter.model';
import { BookFilterComponent } from './book-filter/book-filter.component';
import { PaginationFilter } from '../../../shared/models/pagination-filter.model';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../../shared/models/book.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogBookContentComponent } from './dialog-book-content/dialog-book-content.component';
import { pipe } from 'rxjs';
import { CategoriesService } from '../../categories/services/categories.service';
import { Category } from '../../../shared/models/category.model';


@Component({
  selector: 'app-homepage',
  imports: [AsyncPipe, NgFor, NgIf, BookComponent, PrimaryButtonComponent, BookFilterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  bookService = inject(BookService);
  categoryService = inject(CategoriesService);
  activatedRoute = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  books$ = this.bookService.books$;

  isLoading: boolean = true;

  paginationFilters!: PaginationFilter;
  booksFilters!: BookFilter;
  categories: Category[] = [];

  constructor() {
    this.bookService.paginationFilters$.pipe(takeUntilDestroyed()).subscribe(res => this.paginationFilters = res)
    this.bookService.booksFilters$.pipe(takeUntilDestroyed()).subscribe(res => this.booksFilters = res)

    this.activatedRoute.params.pipe(takeUntilDestroyed()).subscribe(params => {
      this.booksFilters.categoryId = params['categoryId'] || 0;
      if (this.booksFilters.categoryId > 0) {
        this.bookService.loadBooks(this.paginationFilters, this.booksFilters)
        .subscribe({ next: () => this.isLoading = false });
      }
      else {
        this.bookService.loadBooks().subscribe({ next: () => this.isLoading = false }); 
      }
    });
 
    this.categoryService.loadCategories().subscribe({next: (responseCategories)=> this.categories = responseCategories.data})

  }

  openModal(mode: string, book?: Book) {
    const dialogRef = this.dialog.open(DialogBookContentComponent, {
      data: { mode, book }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (mode === "add") {
          this.bookService.addNewBook(result).subscribe({
            next: () => {
              alert('Категория добавлена');
              this.bookService.loadBooks().subscribe();
            },
            error: (err) => alert(`Ошибка: ${err.message}`)
          });
        }
      }
    });
  }

}
