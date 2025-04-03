import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Book } from '../../../shared/models/book.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService{
  
  private booksSubject: BehaviorSubject<Book[]>  = new BehaviorSubject<Book[]>([]);
  readonly books$: Observable<Book[]> = this.booksSubject.asObservable();

  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
 

  private http = inject(HttpClient)
  
  constructor() { } 

  loadBooks(): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.get<Book[]>('http://localhost:3000/books').pipe(
      tap(books  =>  {
        console.log(books); 
        this.booksSubject.next(books);
        this.isLoadingSubject.next(false);
      })
    );
  }

}
