import { DateTimes } from '@woowacourse/mission-utils';

class Promotion {
  constructor({ name, buy, get, startDate, endDate }) {
    this.name = name;
    this.buy = buy;
    this.get = get;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
  }

  isApplicable() {
    const today = new Date(DateTimes.now());
    return today >= this.startDate && today <= this.endDate;
  }
}

export default Promotion;
