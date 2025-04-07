import { Component, inject, Input } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../../../shared/models/category.model';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogContenComponent } from '../dialog-conten/dialog-conten.component';

@Component({
  selector: 'app-category',
  imports: [PrimaryButtonComponent, MatButtonModule, MatDialogModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  @Input() category!: Category

  readonly dialog = inject(MatDialog);
  categoriesService = inject(CategoriesService);
  fb = inject(FormBuilder);


  openModal(mode: string) {
    const dialogRef = this.dialog.open(DialogContenComponent, {
      data: { mode, category: this.category }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (mode) {
          case 'edit':
            this.categoriesService.updateCategory(result).subscribe({
              next: () => {
                alert('Категория обновлена');
                this.categoriesService.loadCategories().subscribe();
              },
              error: (err) => alert(`Ошибка: ${err.message}`)
            });
            break;
          case 'delete':
            if (result === true) {
              this.categoriesService.removeCategory(this.category).subscribe({
                next: () => {
                  alert('Категория удалена');
                  this.categoriesService.loadCategories().subscribe()
                },
                error: (err) => alert(`Ошибка: ${err.message}`)
              });
            }
            break;
        }
      }
    });
  }


  createUpdateCategoryFormToCategoryModelMapper(createUpdateCategoryForm: FormGroup): Category {

    const categoryModel: Category = {
      id: createUpdateCategoryForm.value.id || "0",
      title: createUpdateCategoryForm.value.title || "title title title"
    }

    return categoryModel;
  }

}
