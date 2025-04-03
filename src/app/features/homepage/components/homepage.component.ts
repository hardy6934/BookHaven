import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; 
import { BookComponent } from './book/book.component';

@Component({
  selector: 'app-homepage',
  imports: [AsyncPipe, NgFor, NgIf, BookComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {

  constructor(){
    this.bookService.isLoading$.pipe(takeUntilDestroyed()).subscribe(res=> this.isLoading = res); 
  }

  bookService = inject(BookService);
  books$ = this.bookService.books$;

  isLoading: boolean = false;

 
  ngOnInit(): void {  
    this.bookService.loadBooks().subscribe(); 
  }

}
