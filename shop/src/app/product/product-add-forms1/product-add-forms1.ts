import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductModel } from '../../core/model/product';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/model/category';
import { ProductService } from '../../core/services/product.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  standalone: true,
  selector: 'app-product-add-forms1',
  imports: [CommonModule, FormsModule], // ← ŞART!
  templateUrl: './product-add-forms1.html',
  styleUrls: ['./product-add-forms1.css'],
  providers: [CategoryService, ProductService]
})
export class ProductAddForms1 {
  private readonly categoryService = inject(CategoryService);
  private readonly productService = inject(ProductService)
  private readonly alertifyService = inject(NotificationService);

  categories: Category[] = [];

  model: ProductModel = new ProductModel();

  constructor() {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

add(form: NgForm) {
  if (form.valid) {
    this.productService.addProduct(this.model).subscribe({
      next: (result) => {
        if (result) {
          console.log('Ürün eklendi:', result);
          this.alertifyService.success('Ürün başarıyla eklendi!');

          // Formu sıfırla
          form.resetForm();
          this.model = new ProductModel();
        } else {
          this.alertifyService.error('Ürün eklenirken bir sorun oluştu!');
        }
      },
      error: (err) => {
        console.error('POST API HATASI:', err);
        this.alertifyService.error('Sunucu hatası! Ürün eklenemedi.');
      }
    });
  } else {
    console.warn('Form geçersiz!');
    this.alertifyService.warning('Lütfen tüm alanları doğru doldurun.');
  }
}

}
