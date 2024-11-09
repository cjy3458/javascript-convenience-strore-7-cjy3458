class Product {
  constructor({ name, price, quantity, promotion }) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.promotion = promotion;
  }

  reduceStock(amount) {
    this.quantity -= amount;
  }
}

export default Product;
