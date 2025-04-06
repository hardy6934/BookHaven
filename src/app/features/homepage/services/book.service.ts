import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, Observable, switchMap, tap } from 'rxjs';
import { Book } from '../../../shared/models/book.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BookFilter } from '../../../shared/models/book-filter.model';
import { GetListEl } from '../../../shared/models/get-list-el.model';

@Injectable({
  providedIn: 'root'
})
export class BookService{
  
  private apiUrl: string = "http://localhost:3000/books";
  private filters: BookFilter ={
    _page: 1,
    _per_page: 15 
  }

  private booksSubject: BehaviorSubject<Book[]>  = new BehaviorSubject<Book[]>([]);
  readonly books$: Observable<Book[]> = this.booksSubject.asObservable();

  private filtersSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.filters);
  readonly filters$: Observable<any> = this.filtersSubject.asObservable();

  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  
  
  
  private http = inject(HttpClient)
  
  constructor() {  
  } 


  loadBooks(filter?: BookFilter): Observable<GetListEl<Book>> {
    this.isLoadingSubject.next(true);

    if (filter) this.filtersSubject.next(filter); 
    
    return this.filtersSubject.pipe(
      debounceTime(300), 
      switchMap(filters => {  
        const params = new HttpParams({ fromObject: filters });  
        return this.http.get<GetListEl<Book>>(this.apiUrl, { params });
      }),
      tap(getBooks  =>  {  
        this.booksSubject.next(getBooks.data);
        this.isLoadingSubject.next(false);
        
        console.log(getBooks)
      })
    ); 
  }

  updateBook(book: Book): Observable<any> { 
    return this.http.put<Book>(`${this.apiUrl}/${book.id}`, book);
  }


   

  createBook: Book = {
    id: "123",
    title: "123",
    author: "123",
    categoryId: "123",
    description: "123",
    isFavorite: false
  } 
  addNewBook(): Observable<any> {   
    console.log("ikownenngwr");
    return this.http.post<Book>(`${this.apiUrl}`, this.createBook).pipe(tap(res => console.log(res)));
  }

}
