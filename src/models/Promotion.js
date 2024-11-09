class Promotion {
  constructor({ name, buy, get, startDate, endDate }) {
    this.name = name;
    this.buy = buy;
    this.get = get;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
  }

  isApplicable(currentDate) {
    const today = new Date(currentDate);
    return today >= this.startDate && today <= this.endDate;
  }
}

export default Promotion;
