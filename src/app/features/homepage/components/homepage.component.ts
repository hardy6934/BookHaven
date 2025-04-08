import { Component, inject } from '@angular/core';
import { BookService } from '../services/book.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; 
import { BookComponent } from './book/book.component';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';
import { BookFilter } from '../../../shared/models/book-filter.model'; 


@Component({
  selector: 'app-homepage',
  imports: [AsyncPipe, NgFor, NgIf, BookComponent, PrimaryButtonComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  bookService = inject(BookService);
  books$ = this.bookService.books$;

  isLoading: boolean = true;

  filters: BookFilter = { }
  
  constructor(){ 
    this.bookService.filters$.pipe(takeUntilDestroyed()).subscribe(res=> this.filters = res) 

    this.bookService.loadBooks().subscribe({next: () => this.isLoading = false});
 
  }

  addNewBook(): void{ 
    this.bookService.addNewBook().subscribe(); 
  }

}
