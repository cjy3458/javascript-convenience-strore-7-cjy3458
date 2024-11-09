import { Console } from '@woowacourse/mission-utils';
import MESSAGE from '../constants/message.js';

class InputView {
  static async readProductAndQuantity() {
    Console.print(MESSAGE.INPUT_PROMPT);
    const input = await Console.readLineAsync();
    return input.trim();
  }

  static async readPromotionDecision(product, quantity) {
    Console.print(MESSAGE.PROMOTION_PROMPT(product, quantity));
    const input = await Console.readLineAsync();
    return input.trim().toUpperCase();
  }

  static async readPromotionShortageDecision(product, quantity) {
    Console.print(MESSAGE.PROMOTION_SHORTAGE_PROMPT(product, quantity));
    const input = await Console.readLineAsync();
    return input.trim().toUpperCase();
  }

  static async readMembershipDecision() {
    Console.print(MESSAGE.MEMBERSHIP_PROMPT);
    const input = await Console.readLineAsync();
    return input.trim().toUpperCase();
  }

  static async readMorePurchaseDecision() {
    Console.print(MESSAGE.MORE_PURCHASE_PROMPT);
    const input = await Console.readLineAsync();
    return input.trim().toUpperCase();
  }
}

export default InputView;
