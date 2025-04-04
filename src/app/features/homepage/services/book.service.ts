import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Book } from '../../../shared/models/book.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService{
  
  private apiUrl: string = "http://localhost:3000/books";

  private booksSubject: BehaviorSubject<Book[]>  = new BehaviorSubject<Book[]>([]);
  readonly books$: Observable<Book[]> = this.booksSubject.asObservable();

  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
 

  private http = inject(HttpClient)
  
  constructor() {  
  } 

  loadBooks(): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.get<Book[]>(this.apiUrl).pipe(
      tap(books  =>  { 
        this.booksSubject.next(books);
        this.isLoadingSubject.next(false);
        
        console.log(books)
      })
    );
  }

  updateBook(book: Book): Observable<any> { 
    return this.http.put<Book>(`${this.apiUrl}/${book.id}`, book);
  }

}
