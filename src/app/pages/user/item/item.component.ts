import { Component, OnInit } from '@angular/core';
import { Item, Category } from '../../../core/models/item.model';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ItemService } from '../../../core/services/item/item.service';
import { CategoryService } from '../../../core/services/category/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  items: Item[] = [];
  filteredItems: Item[] = [];
  categories: Category[] = [];
  searchTerm: string = '';
  showModal: boolean = false;


  newItem: Item = {
    itemId: '',
    itemName: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    timeListed: '',
    expirationDate: '',
    categoryId: 0,
    userID: ''
  };

  newCategory: Category = {
    categoryId: 0,
    categoryName: '',
    description: ''
  };

  showItemModal: boolean = false;
  showCategoryModal: boolean = false;

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadItems();
    this.loadCategories();
  }

  loadItems(): void {
    this.itemService.getAllItem().subscribe({
      next: (data) => {
        this.items = data;
        this.filteredItems = data;
      },
      error: (err) => console.error('Error fetching items:', err)
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error('Error fetching categories:', err)
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredItems = this.items.filter(i =>
      i.itemName.toLowerCase().includes(term) ||
      i.description.toLowerCase().includes(term)
    );
  }

submitItem(): void {
  // Ensure the selected category is set in the newItem before sending
  if (!this.newItem.categoryId) {
    alert('Please select a category before saving the item.');
    return;
  }


  // this.newItem.userID = this.authService.getUser(); 

  this.itemService.createItem(this.newItem).subscribe({
    next: (item) => {
      this.items.push(item);
      this.filteredItems = this.items;
      this.resetItemForm();
      this.showItemModal = false;
    },
    error: (err) => console.error('Error creating item:', err)
  });
}

  submitCategory(): void {
    this.categoryService.createCategory(this.newCategory).subscribe({
      next: (category) => {
        this.categories.push(category);
        this.resetCategoryForm();
        this.showCategoryModal = false;
      },
      error: (err) => console.error('Error creating category:', err)
    });
  }
getCategoryName(categoryId: number): string {
  // Find the category object from the array of categories
  const category = this.categories.find(c => c.categoryId === categoryId);

  // Return the category name if found, otherwise 'Unknown'
  return category ? category.categoryName : 'Unknown';
}


  deleteItem(itemId: string): void {
    if (!confirm('Are you sure you want to delete this item?')) return;

    this.itemService.deleteItem(itemId).subscribe({
      next: () => {
        this.items = this.items.filter(i => i.itemId !== itemId);
        this.filteredItems = this.filteredItems.filter(i => i.itemId !== itemId);
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }

  resetItemForm(): void {
    this.newItem = {
      itemId: '',
      itemName: '',
      description: '',
      price: 0,
      stockQuantity: 0,
      timeListed: '',
      expirationDate: '',
      categoryId: 0,
      userID: ''
    };
  }

  resetCategoryForm(): void {
    this.newCategory = {
      categoryId: 0,
      categoryName: '',
      description: ''
    };
  }
}
