import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/model/category';
import { NotificationService } from '../../core/services/notification.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  standalone: true,
  selector: 'app-product-add-forms2',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-add-forms2.component.html',
  styleUrls: ['./product-add-forms2.component.css'],
  providers: [CategoryService, ProductService]
})
export class ProductAddForms2Component {
  productForm: FormGroup;
  categories: Category[] = [];

  private readonly categoryService = inject(CategoryService);
  private readonly productService = inject(ProductService);
  private readonly notificationService = inject(NotificationService);

  constructor() {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      categoryID: new FormControl(null, Validators.required),
    });

    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Kategori yüklenirken hata:', err);
        this.notificationService.error('Kategoriler yüklenirken bir hata oluştu!');
      }
    });
  }

  add() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe({
        next: (result) => {
          if (result) {
            console.log('Ürün API ile eklendi:', result);
            this.notificationService.success('Ürün başarıyla eklendi!');

            this.productForm.reset();
          } else {
            this.notificationService.error('Ürün eklenirken bir hata oluştu!');
          }
        },
        error: (err) => {
          console.error('Ürün eklenirken API hatası:', err);
          this.notificationService.error('Sunucu hatası! Ürün eklenemedi.');
        }
      });
    } else {
      console.warn('Form geçersiz!');
      this.notificationService.warning('Lütfen formu eksiksiz doldurun.');
    }
  }
}
