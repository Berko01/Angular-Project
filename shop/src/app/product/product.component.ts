import { Component, inject } from '@angular/core';
import { ProductModel } from '../core/model/product';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../core/services/notification.service';
import { ProductService } from '../core/services/product.service';
import { ActivatedRoute } from '@angular/router'; // SADECE EKLENDİ
import { CategoryComponent } from '../category/category.component';

@Component({
  standalone: true,
  selector: 'app-product',
  imports: [CommonModule, CurrencyPipe, FormsModule, CategoryComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  title = 'Ürün Listesi';
  filterText = '';
  products: ProductModel[] = [];

  private readonly notifier = inject(NotificationService);
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute); // SADECE EKLENDİ

ngOnInit() {
  this.route.params.subscribe(params => {
    const categoryId = params["id"]; 
    console.log(categoryId)
    if (categoryId) {
      this.loadProducts(categoryId);
    } else {
      this.loadProducts(); 
    }
  })
}

private loadProducts(categoryId?: string): void {
  this.productService.getProducts(categoryId).subscribe({
    next: (data) => {
      this.products = data;
    },
    error: (err) => {
      console.error('API HATASI:', err);
    }
  });
}



  get filteredProducts(): ProductModel[] {
    const filter = this.filterText.trim().toLowerCase();
    return filter
      ? this.products.filter(p => p.name.toLowerCase().includes(filter))
      : this.products;
  }

  addToCart(product: ProductModel): void {
    this.notifier.success(`${product.name} sepete eklendi!`);
  }
}
