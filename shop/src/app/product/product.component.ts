import { Component, inject } from '@angular/core';
import { ProductModel } from './product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../core/services/notification.service';
import { ProductService } from '../core/services/product.service';

@Component({
  standalone: true,
  selector: 'app-product',
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
})
export class ProductComponent {
  title = 'Ürün Listesi';
  filterText = '';
  products: ProductModel[] = [];

  private readonly notifier = inject(NotificationService);
  private readonly productService = inject(ProductService);

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe({
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
