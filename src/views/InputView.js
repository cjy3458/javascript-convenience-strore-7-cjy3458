import { Console } from '@woowacourse/mission-utils';
import MESSAGE from '../constants/message.js';

class InputView {
  static async readProductAndQuantity() {
    const input = await Console.readLineAsync(MESSAGE.INPUT_PROMPT);
    return input.trim();
  }

  static async readPromotionDecision(product, quantity) {
    const input = await Console.readLineAsync(
      MESSAGE.PROMOTION_PROMPT(product, quantity),
    );
    return input.trim().toUpperCase();
  }

  static async readPromotionShortageDecision(product, quantity) {
    const input = await Console.readLineAsync(
      MESSAGE.PROMOTION_SHORTAGE_PROMPT(product, quantity),
    );
    return input.trim().toUpperCase();
  }

  static async readMembershipDecision() {
    const input = await Console.readLineAsync(MESSAGE.MEMBERSHIP_PROMPT);
    return input.trim().toUpperCase();
  }

  static async readMorePurchaseDecision() {
    const input = await Console.readLineAsync(MESSAGE.MORE_PURCHASE_PROMPT);
    return input.trim().toUpperCase();
  }
}

export default InputView;
