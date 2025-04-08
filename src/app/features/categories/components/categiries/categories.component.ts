import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { PaginationFilter } from '../../../../shared/models/pagination-filter.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { CategoryComponent } from '../category/category.component';
import { DialogContenComponent } from '../dialog-conten/dialog-conten.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { Category } from '../../../../shared/models/category.model';

@Component({
  selector: 'app-categories',
  imports: [PrimaryButtonComponent, NgFor, NgIf, AsyncPipe, CategoryComponent, 
    MatButtonModule, MatDialogModule, PaginationComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  categoriesService = inject(CategoriesService);
  readonly dialog = inject(MatDialog);
  categories$ = this.categoriesService.categories$;

  isLoading: boolean = true;

  filters!: PaginationFilter;

  constructor() {
    this.categoriesService.filters$.pipe(takeUntilDestroyed()).subscribe(res => this.filters = res) 
    this.categoriesService.loadCategories(this.filters).subscribe({next: () => this.isLoading = false});
  }

  openModal(mode: string, category?: Category) {  
    const dialogRef = this.dialog.open(DialogContenComponent, {  
      data: { mode, category }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (mode === "add") {
          this.categoriesService.addNewCategory(result).subscribe({
            next: () => {
              alert('Категория добавлена'); 
              this.categoriesService.loadCategories().subscribe();
            },
            error: (err) => alert(`Ошибка: ${err.message}`)
          });
        }
      }
    });
  }


}
