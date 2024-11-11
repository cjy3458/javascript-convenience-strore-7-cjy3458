class Product {
  constructor({ name, price, quantity, promotion, promotionStock = 0 }) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.promotion = promotion;
    this.promotionStock = promotionStock;
  }

  reduceStock(amount) {
    this.quantity = Math.max(0, this.quantity - amount); // 음수 방지
  }

  reducePromotionStock(amount) {
    this.promotionStock = Math.max(0, this.promotionStock - amount); // 음수 방지
  }

  get isOutOfStock() {
    return this.quantity === 0 && this.promotionStock === 0;
  }
}

export default Product;
