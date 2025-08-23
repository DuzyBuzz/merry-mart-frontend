export interface Item {
  itemId: string;       
  itemName: string;
  description: string;
  price: number;
  stockQuantity: number;
  timeListed: string;     
  expirationDate: string; 
  categoryId: number;   
  userID: string;
}

export interface Category {
  categoryId: number;  
  categoryName: string;
  description?: string;
  createdAt?: string;
}
