class Promotion {
  constructor({ name, buy, get, startDate, endDate }) {
    this.name = name;
    this.buy = buy;
    this.get = get;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
  }

  isApplicable(currentDate = new Date()) {
    const today = new Date(currentDate);
    return today >= this.startDate && today <= this.endDate;
  }

  reduceQuantity(quantity) {
    this.quantity -= quantity;
  }
}

export default Promotion;
