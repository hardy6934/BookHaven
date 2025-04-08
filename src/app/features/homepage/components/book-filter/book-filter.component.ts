import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { PaginationFilter } from '../../../../shared/models/pagination-filter.model';
import { NgFor } from '@angular/common';
import { BookFilter } from '../../../../shared/models/book-filter.model';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-book-filter',
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './book-filter.component.html',
  styleUrl: './book-filter.component.scss'
})
export class BookFilterComponent {

  bookService = inject(BookService);
  fb = inject(FormBuilder);

  paginationFilter!: PaginationFilter;
  booksFilters!: BookFilter;
  paginationForm: FormGroup;

  pageSizeOptions = [3, 5, 10, 15, 20, 30, 50];
  isFavoriteOptions = [null, true, false];

  constructor() {
    this.bookService.paginationFilters$.pipe(takeUntilDestroyed()).
      subscribe(res => this.paginationFilter = res)

    this.bookService.booksFilters$.pipe(takeUntilDestroyed()).
      subscribe(res => this.booksFilters = res)

    this.paginationForm = this.fb.group({
      _per_page: [this.paginationFilter._per_page || 10, [Validators.required]],
      isFavorite: [this.booksFilters.isFavorite || false],
      isNotFavorite: [this.booksFilters.isNotFavorite || false]
    });

    this.paginationForm.get('isFavorite')?.valueChanges
      .pipe(takeUntilDestroyed()).subscribe(isFavorite => {
        if (isFavorite) {
          this.paginationForm.get('isNotFavorite')?.setValue(false, { emitEvent: false });
        }
      });

    this.paginationForm.get('isNotFavorite')?.valueChanges
      .pipe(takeUntilDestroyed()).subscribe(isNotFavorite => {
        if (isNotFavorite) {
          this.paginationForm.get('isFavorite')?.setValue(false, { emitEvent: false });
        }
      }); 
     

      this.paginationForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(formValues => {
        this.paginationFilter._page = 1;
        this.paginationFilter._per_page = formValues._per_page; 
        this.booksFilters.isFavorite = formValues.isFavorite;
        this.booksFilters.isNotFavorite = formValues.isNotFavorite;

        this.bookService.loadBooks(this.paginationFilter, this.booksFilters).subscribe();
      });
 

  }

  nextPage() {
    if (this.paginationFilter._page < this.paginationFilter.pages) {
      this.paginationFilter._page++;
      this.bookService.loadBooks(this.paginationFilter).subscribe();
    }
  }

  previousPage() {
    if (this.paginationFilter._page > 1) {
      this.paginationFilter._page--;
      this.bookService.loadBooks(this.paginationFilter).subscribe();
    }
  }

  showAll() {
    if (this.paginationFilter._page > 1) {
      this.paginationFilter._page--;
      this.bookService.loadBooks(this.paginationFilter).subscribe();
    }
  }


}
