import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { BookFilter } from '../../../../shared/models/book-filter.model'; 

@Component({
  selector: 'app-book-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './book-filter.component.html',
  styleUrl: './book-filter.component.scss'
})
export class BookFilterComponent {
  
  fb = inject(FormBuilder);
  bookService = inject(BookService);
  
  filterForm: FormGroup; 
 
  filters: BookFilter = {
    _page: 1,
    _per_page: 7
  };
   
  constructor() { 
    this.filterForm = this.fb.group({ 
      categoryId: [0],
      isFavorite: [null], 
      _page: [1, [Validators.min(1), Validators.pattern("/^[1-9]\d*$/")]],
      _per_page: [10, [Validators.min(10), Validators.pattern("/^[1-9]\d*$/")]]
    });

    this.filterForm.valueChanges.pipe( 
      takeUntilDestroyed()
    ).subscribe(() => this.applyFilters());
  }

  applyFilters(): void { 
    // this.bookService.loadBooks(this.prepareFilters(this.filterForm, this.filters)).subscribe();
    this.bookService.loadBooks(this.filters);
  }

  resetFilters():void{}

  // prepareFilters(formValue: any, filters:BookFilter): BookFilter {
     
  //   if (formValue.categoryId && formValue.categoryId !== 0) {
  //     filters.categoryId = formValue.categoryId;
  //   }
   
  //   if (formValue.isFavorite !== null) {
  //     filters.isFavorite = formValue.isFavorite;
  //   }
   
  //   filters._page = formValue._page || 1;
  //   filters._per_page = formValue._per_page || 10;
  
  //   debugger
  //   console.log("filters" + filters);
  //   return filters;
  // }
 

}
