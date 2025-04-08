import { AfterViewChecked, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PaginationFilter } from '../../models/pagination-filter.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriesService } from '../../../features/categories/services/categories.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  categoriesService = inject(CategoriesService);
  fb = inject(FormBuilder);
 
  paginationFilter!: PaginationFilter;
  paginationForm: FormGroup;

  pageSizeOptions = [2, 4, 10, 15, 20, 50];

  constructor() {

    this.categoriesService.filters$.pipe(takeUntilDestroyed()).
      subscribe(res => this.paginationFilter = res)

    this.paginationForm = this.fb.group({
      _per_page: [this.paginationFilter._per_page || 10, [Validators.required]]
    });

    this.paginationForm.get('_per_page')?.valueChanges
    .pipe(takeUntilDestroyed())
    .subscribe(perPage => {
      console.log("_per_page_per_page_per_page_per_page")
      this.paginationFilter._page = 1;
      this.paginationFilter._per_page = perPage;
      this.categoriesService.loadCategories(this.paginationFilter).subscribe();
    }); 

  }

  nextPage() {
    if (this.paginationFilter._page < this.paginationFilter.pages) {
      this.paginationFilter._page++;
      this.categoriesService.loadCategories(this.paginationFilter).subscribe();
    }
  }

  previousPage() {
    if (this.paginationFilter._page > 1) {
      this.paginationFilter._page--;
      this.categoriesService.loadCategories(this.paginationFilter).subscribe();
    }
  }



}
