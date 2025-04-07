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
    _per_page: 15
  }

  private categorySubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  readonly categories$: Observable<Category[]> = this.categorySubject.asObservable();

  private filtersSubject: BehaviorSubject<PaginationFilter> = new BehaviorSubject<PaginationFilter>(this.filters);
  readonly filters$: Observable<PaginationFilter> = this.filtersSubject.asObservable();

  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();


  private http = inject(HttpClient)
  constructor() { }


  loadCategories(filter?: PaginationFilter): Observable<GetListEl<Category>> {
    this.isLoadingSubject.next(true);

    if (filter) this.filtersSubject.next(filter);

    const params = new HttpParams()
      .set("_page", this.filtersSubject.value._page)
      .set("_per_page", this.filtersSubject.value._per_page);

    return this.http.get<GetListEl<Category>>(this.apiUrl, { params }).pipe(
      tap((res) => {
        console.log("categories", res);
        this.categorySubject.next(res.data);
        this.isLoadingSubject.next(false);
      })

    );

  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${category.id}`, category).pipe(tap(res => console.log(res)));
  }

  addNewCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}`, category)
    .pipe(
      tap((res) =>
      this.categorySubject.next([...this.categorySubject.value, res])
    ));
  }

  removeCategory(category: Category): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${category.id}`).pipe(
      tap(() =>
        this.categorySubject.next(this.categorySubject.value.filter(c => c.id !== category.id))
      ));
  }
}
