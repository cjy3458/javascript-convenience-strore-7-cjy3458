import fs from 'fs';
import path from 'path';

class Store {
  constructor() {
    this.products = [];
    this.promotions = [];
  }

  initializeStore() {
    this.products = this.loadProducts();
    this.promotions = this.loadPromotions();
  }

  loadProducts() {
    const filePath = path.resolve('public/products.md');
    const data = fs.readFileSync(filePath, 'utf-8').trim();
    console.log(data);
  }

  loadPromotions() {
    const filePath = path.resolve('public/promotions.md');
    const data = fs.readFileSync(filePath, 'utf-8').trim();
    console.log(data);
  }
}

export default Store;
