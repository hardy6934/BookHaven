import { Component, Inject, inject } from '@angular/core';
import { BookService } from '../../services/book.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Book } from '../../../../shared/models/book.model';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CategoriesService } from '../../../categories/services/categories.service';
import { Category } from '../../../../shared/models/category.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialog-book-content',
  imports: [NgIf, NgFor,MatDialogModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, ReactiveFormsModule, MatSlideToggleModule, MatSelectModule],
  templateUrl: './dialog-book-content.component.html',
  styleUrl: './dialog-book-content.component.scss'
})
export class DialogBookContentComponent {


  bookService = inject(BookService);
  categoryService = inject(CategoriesService)
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef);
 
  mode: string;
  head: string;
  bookForm: FormGroup;  

  categories: Category[] = [];
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: { mode: string, book: Book }) {
    this.mode = data.mode;
    this.head = this.getTitle(data.mode);  

    this.bookForm = this.fb.group({
      id: [data.book?.id || '0', Validators.required],
      title: [data.book?.title || '', Validators.required],
      author: [data.book?.author || '', Validators.required],
      categoryId: [data.book?.categoryId || '0', Validators.required],
      description: [data.book?.description || '', Validators.required],
      isFavorite: [data.book?.isFavorite || false, Validators.required]
    });  
 
    this.categoryService.loadCategories().subscribe({next: (responseCategories)=> this.categories = responseCategories.data})
   }
  
  createUpdateBookFormToBookModelMapper(bookForm: FormGroup): Book {  
    
    const bookModel: Book = {
      id: bookForm.value.id,
      title: bookForm.value.title,
      author: bookForm.value.author,
      categoryId: bookForm.value.categoryId,
      description: bookForm.value.description,
      isFavorite: bookForm.value.isFavorite
    } 

    return bookModel;
  }

  onSubmit(): void {
    if (this.bookForm.valid && this.mode !== 'delete') {
      this.dialogRef.close(this.createUpdateBookFormToBookModelMapper(this.bookForm));
    }
  }

  onDelete() {
    this.dialogRef.close(true);
  }

  getTitle(mode: string): string {
    switch (mode) {
      case 'edit': return 'Редактировать книгу';
      case 'add': return 'Добавить книгу';
      case 'delete': return 'Вы действительно хотите удалить книгу?';
      default: return '';
    }
  }

}
