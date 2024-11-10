class Product {
  constructor({ name, price, quantity, promotion, promotionStock = 0 }) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.promotion = promotion;
    this.promotionStock = promotionStock;
  }

  reduceStock(amount) {
    this.quantity -= amount;
  }

  reducePromotionStock(amount) {
    this.promotionStock -= amount;
  }
}

export default Product;
