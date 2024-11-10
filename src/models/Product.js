class Product {
  constructor({ name, price, quantity, promotion, promotionStock = 0 }) {
    this.name = name;
    this.price = price;
    this.quantity = quantity; // 일반 재고
    this.promotion = promotion;
    this.promotionStock = promotionStock; // 프로모션 재고
  }

  // 일반 재고 감소
  reduceStock(amount) {
    this.quantity -= amount;
  }

  reducePromotionStock(amount) {
    this.promotionStock -= amount;
  }
}

export default Product;
