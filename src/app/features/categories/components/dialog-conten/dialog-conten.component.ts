import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../../../shared/models/category.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dialog-conten',
  imports: [NgIf, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './dialog-conten.component.html',
  styleUrl: './dialog-conten.component.scss'
})
export class DialogContenComponent {

  categoriesService = inject(CategoriesService);
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef);
 
  mode: string;
  title: string;
  categoryForm: FormGroup;  

 
  constructor(@Inject(MAT_DIALOG_DATA) public data: { mode: string, category: Category }) {
    this.mode = data.mode;
    this.title = this.getTitle(data.mode);  

    this.categoryForm = this.fb.group({
      id: [data.category?.id || '0', Validators.required],
      title: [data.category?.title || '', Validators.required]
    }); 
  }
  
  createUpdateCategoryFormToCategoryModelMapper(categoryForm: FormGroup): Category {  
    
    const categoryModel: Category = {
      id: categoryForm.value.id,
      title: categoryForm.value.title
    } 

    return categoryModel;
  }

  onSubmit(): void {
    if (this.categoryForm.valid && this.mode !== 'delete') {
      this.dialogRef.close(this.createUpdateCategoryFormToCategoryModelMapper(this.categoryForm));
    }
  }

  onDelete() {
    this.dialogRef.close(true);
  }

  getTitle(mode: string): string {
    switch (mode) {
      case 'edit': return 'Редактировать категорию';
      case 'add': return 'Добавить категорию';
      case 'delete': return 'Вы действительно хотите удалить категорию?';
      default: return '';
    }
  }

}
