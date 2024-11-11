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
    const [, ...rows] = data.split('\n');

    const promotions = this.loadPromotions();

    const productMap = new Map();

    rows.forEach((row) => {
      const [name, price, quantity, promotion] = row
        .split(',')
        .map((value) => value.trim());

      if (!productMap.has(name)) {
        productMap.set(name, {
          name,
          price: Number(price),
          quantity: 0,
          promotionStock: 0,
          promotion: null,
          buy: null,
          get: null,
        });
      }

      const product = productMap.get(name);

      if (promotion === 'null') {
        product.quantity += Number(quantity);
      } else {
        if (quantity === 0) {
          product.quantity = null;
        }
        product.promotionStock += Number(quantity);
        product.promotion = promotion;

        const promoDetails = promotions.find(
          (promo) => promo.name === promotion,
        );
        if (promoDetails) {
          product.buy = promoDetails.buy;
          product.get = promoDetails.get;
        }
      }
    });

    return Array.from(productMap.values()).map(
      (product) => new Product(product),
    );
  }

  loadPromotions() {
    const filePath = path.resolve('public/promotions.md');
    const data = fs.readFileSync(filePath, 'utf-8').trim();
    const [, ...rows] = data.split('\n');
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
}

export default Store;
