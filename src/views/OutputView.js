import { Console } from '@woowacourse/mission-utils';
import MESSAGE from '../constants/message.js';

class OutputView {
  static printWelcomeMessage() {
    Console.print(MESSAGE.WELCOME);
  }

  static printProductList(products) {
    products.forEach((product) => {
      console.log(OutputView.formatProductMessage(product));
    });
  }

  static formatProductMessage(product) {
    const messages = [];

    if (product.promotionStock > 0) {
      // 프로모션 상품 출력
      messages.push(
        `- ${product.name} ${product.price.toLocaleString()}원 ${product.promotionStock}개 ${product.promotion}`,
      );
    }

    if (product.quantity > 0) {
      // 일반 상품 출력
      messages.push(
        `- ${product.name} ${product.price.toLocaleString()}원 ${product.quantity}개`,
      );
    }

    return messages.join('\n');
  }

  static printReceipt({
    items,
    gifts,
    totalAmount,
    promotionDiscount,
    membershipDiscount,
    finalAmount,
  }) {
    Console.print(MESSAGE.RECEIPT_HEADER);
    this.printReceiptItems(items);
    this.printReceiptGifts(gifts);
    this.printReceiptSummary(
      totalAmount,
      promotionDiscount,
      membershipDiscount,
      finalAmount,
    );
  }

  static printReceiptItems(items) {
    Console.print(MESSAGE.RECEIPT_ITEMS_HEADER);
    items.forEach(({ name, quantity, totalPrice }) => {
      Console.print(`${name}\t\t${quantity}\t${totalPrice.toLocaleString()}`);
    });
  }

  static printReceiptGifts(gifts) {
    if (gifts.length > 0) {
      Console.print(MESSAGE.RECEIPT_GIFTS_HEADER);
      gifts.forEach(({ name, quantity }) => {
        Console.print(`${name}\t\t${quantity}`);
      });
    }
  }

  static printReceiptSummary(
    totalAmount,
    promotionDiscount,
    membershipDiscount,
    finalAmount,
  ) {
    Console.print(MESSAGE.RECEIPT_FOOTER);
    Console.print(
      `${MESSAGE.RECEIPT_TOTAL_AMOUNT}\t\t${totalAmount.toLocaleString()}`,
    );
    Console.print(
      `${MESSAGE.RECEIPT_PROMOTION_DISCOUNT}\t\t-${promotionDiscount.toLocaleString()}`,
    );
    Console.print(
      `${MESSAGE.RECEIPT_MEMBERSHIP_DISCOUNT}\t\t-${membershipDiscount.toLocaleString()}`,
    );
    Console.print(
      `${MESSAGE.RECEIPT_FINAL_AMOUNT}\t\t${finalAmount.toLocaleString()}`,
    );
  }

  static printThankYouMessage() {
    Console.print(MESSAGE.THANK_YOU);
  }

  static printError(message, name) {
    Console.print(`${message} (${name})\n`);
  }
}

export default OutputView;
