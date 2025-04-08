import { inject, Injectable } from '@angular/core';
import { PaginationFilter } from '../../../shared/models/pagination-filter.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Category } from '../../../shared/models/category.model';
import { GetListEl } from '../../../shared/models/get-list-el.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl: string = "http://localhost:3000/categories";
  private filters: PaginationFilter = {
    _page: 1,
    _per_page: 10,

    first: 1,
    items: 0,
    last: 1,
    next: null,
    pages: 1,
    prev: null
  }
 
  private categorySubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  readonly categories$: Observable<Category[]> = this.categorySubject.asObservable();

  private filtersSubject: BehaviorSubject<PaginationFilter> = new BehaviorSubject<PaginationFilter>(this.filters);
  readonly filters$: Observable<PaginationFilter> = this.filtersSubject.asObservable();
 
  private http = inject(HttpClient)
  constructor() { }


  loadCategories(filter?: PaginationFilter): Observable<GetListEl<Category>> {  
    if (filter) this.filtersSubject.next(filter);

    const params = new HttpParams()
      .set("_page", this.filtersSubject.value._page)
      .set("_per_page", this.filtersSubject.value._per_page);
 
    return this.http.get<GetListEl<Category>>(this.apiUrl, { params }).pipe(
      tap((res) => {
        console.log("categories", res);
        this.categorySubject.next(res.data); 

        this.filtersSubject.next({
          ...this.filtersSubject.value,
          first: res.first,
          items: res.items,
          last: res.last,
          next: res.next,
          pages: res.pages,
          prev: res.prev
        });
         

      })

    );

  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${category.id}`, category);
  }

  addNewCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}`, category)
    // return this.http.post<Category>(`${this.apiUrl}`, category)
    // .pipe(
    //   tap((res) =>
    //   this.categorySubject.next([...this.categorySubject.value, res])
    // ));
  }

  removeCategory(category: Category): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${category.id}`);
    // return this.http.delete(`${this.apiUrl}/${category.id}`).pipe(
    //   tap(() =>
    //     this.categorySubject.next(this.categorySubject.value.filter(c => c.id !== category.id))
    //   ));
  }
}
