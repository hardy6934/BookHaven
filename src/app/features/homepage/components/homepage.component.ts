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


@Component({
  selector: 'app-homepage',
  imports: [AsyncPipe, NgFor, NgIf, BookComponent, PrimaryButtonComponent, BookFilterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  bookService = inject(BookService); 
  activatedRoute = inject(ActivatedRoute);
  books$ = this.bookService.books$;

  isLoading: boolean = true;

  paginationFilters!: PaginationFilter;
  booksFilters!: BookFilter;
  
  constructor(){ 
    this.bookService.paginationFilters$.pipe(takeUntilDestroyed()).subscribe(res=> this.paginationFilters = res) 
    this.bookService.booksFilters$.pipe(takeUntilDestroyed()).subscribe(res=> this.booksFilters = res) 
    
     
      
    this.activatedRoute.params.pipe(takeUntilDestroyed()).subscribe(params => {
      this.booksFilters.categoryId = params['categoryId'] || 0;
      if(this.booksFilters.categoryId > 0)
      {   
        this.bookService.loadBooks(this.paginationFilters, this.booksFilters).subscribe({next: () => this.isLoading = false});
      }
      else{
        this.bookService.loadBooks().subscribe({next: () => this.isLoading = false});
      }
    });
      
 
  }

  addNewBook(): void{ 
    this.bookService.addNewBook().subscribe(); 
  }

}
