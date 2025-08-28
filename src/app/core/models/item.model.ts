export interface Item {
  itemId: number;       
  itemName: string;
  description: string;
  capitalCost: number;
  sellingPrice: number;
  stockQuantity: number;
  categoryId: number;   
}

export interface Category {
  categoryId: number;  
  categoryName: string;
  description?: string;
  createdAt?: string;
}
