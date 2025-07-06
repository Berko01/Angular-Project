import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Category } from '../core/model/category';
import { CategoryService } from '../core/services/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  title = "Kategori Listesi";

  categories: Category[] = [];

  private readonly categoryService = inject(CategoryService);

  constructor() {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      console.log('CATEGORIES LOADED:', this.categories);
    });
  }
}
