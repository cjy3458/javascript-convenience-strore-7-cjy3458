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
    const currentDate = new Date(DateTimes.now()); // 현재 날짜 가져오기
    return currentDate >= this.startDate && currentDate <= this.endDate;
  }
}

export default Promotion;
