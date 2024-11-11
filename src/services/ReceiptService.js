import OutputView from '../views/OutputView.js';

class ReceiptService {
  static printReceipt(purchaseDetails, gifts, membershipDiscount, store) {
    const totalAmount = this.calculateTotalAmount(purchaseDetails);
    const promotionDiscount = this.calculatePromotionDiscount(gifts, store);

    const finalAmount = totalAmount - promotionDiscount - membershipDiscount;

    OutputView.printReceipt({
      items: purchaseDetails,
      gifts,
      totalAmount,
      promotionDiscount,
      membershipDiscount,
      finalAmount,
    });
  }

  static calculateTotalAmount(purchaseDetails) {
    return purchaseDetails.reduce(
      (total, { totalPrice }) => total + totalPrice,
      0,
    );
  }

  static calculatePromotionDiscount(gifts, store) {
    return gifts.reduce((total, { name, quantity }) => {
      const product = store.products.find((p) => p.name === name);
      return total + product.price * quantity;
    }, 0);
  }
}

export default ReceiptService;
