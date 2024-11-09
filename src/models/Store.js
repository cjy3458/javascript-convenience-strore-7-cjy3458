import fs from 'fs';
import path from 'path';
import Product from './Product.js';
import Promotion from './Promotion.js';

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
    const [header, ...rows] = data.split('\n');
    return rows.map((row) => {
      const [name, price, quantity, promotion] = row
        .split(',')
        .map((value) => value.trim());
      return new Product({
        name,
        price: Number(price),
        quantity: Number(quantity),
        promotion: promotion === 'null' ? null : promotion,
      });
    });
  }

  loadPromotions() {
    const filePath = path.resolve('public/promotions.md');
    const data = fs.readFileSync(filePath, 'utf-8').trim();
    const [header, ...rows] = data.split('\n');
    return rows.map((row) => {
      const [name, buy, get, startDate, endDate] = row
        .split(',')
        .map((value) => value.trim());
      return new Promotion({
        name,
        buy: Number(buy),
        get: Number(get),
        startDate,
        endDate,
      });
    });
  }

  updateStock(items) {
    items.forEach(({ name, quantity }) => {
      const product = this.products.find((p) => p.name === name);
      product.reduceStock(quantity);
    });
  }
}

export default Store;
