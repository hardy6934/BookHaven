import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, Observable, switchMap, tap } from 'rxjs';
import { Book } from '../../../shared/models/book.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BookFilter } from '../../../shared/models/book-filter.model';
import { GetListEl } from '../../../shared/models/get-list-el.model';
import { PaginationFilter } from '../../../shared/models/pagination-filter.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl: string = "http://localhost:3000/books";

  private paginationFilters: PaginationFilter = {
    _page: 1,
    _per_page: 10,

    first: 1,
    items: 0,
    last: 1,
    next: null,
    pages: 1,
    prev: null
  }

  private booksFilters: BookFilter = {
    isFavorite: false,
    isNotFavorite: false,
    categoryId: 0
  }

  private booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  readonly books$: Observable<Book[]> = this.booksSubject.asObservable();

  private booksFiltersSubject: BehaviorSubject<BookFilter> = new BehaviorSubject<BookFilter>(this.booksFilters);
  readonly booksFilters$: Observable<BookFilter> = this.booksFiltersSubject.asObservable();

  private paginationFiltersSubject: BehaviorSubject<PaginationFilter> = new BehaviorSubject<PaginationFilter>(this.paginationFilters);
  readonly paginationFilters$: Observable<PaginationFilter> = this.paginationFiltersSubject.asObservable();
 
  private http = inject(HttpClient)

  constructor() {
  }


  loadBooks(paginationfilters?: PaginationFilter, booksFilters?: BookFilter): Observable<GetListEl<Book>> {

    if (paginationfilters) this.paginationFiltersSubject.next(paginationfilters);
    if (booksFilters) this.booksFiltersSubject.next(booksFilters);

    let params = new HttpParams()
      .set("_page", this.paginationFiltersSubject.value._page)
      .set("_per_page", this.paginationFiltersSubject.value._per_page);

      if(this.booksFiltersSubject.value.isFavorite)
      { 
        params = params.set("isFavorite", true); 
      } 
      if(this.booksFiltersSubject.value.isNotFavorite)
      { 
        params = params.set("isFavorite", false); 
      }
      if(this.booksFiltersSubject.value.categoryId > 0)
      { 
        params = params.set("categoryId", this.booksFiltersSubject.value.categoryId); 
      }

    return this.http.get<GetListEl<Book>>(this.apiUrl, { params }).pipe(
      tap((res) => {
        console.log("books", res);

        this.booksSubject.next(res.data);

        this.paginationFiltersSubject.next({
          ...this.paginationFiltersSubject.value,
          first: res.first,
          items: res.items,
          last: res.last,
          next: res.next,
          pages: res.pages,
          prev: res.prev
        });


      }));

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
