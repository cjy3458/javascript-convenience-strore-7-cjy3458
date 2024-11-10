import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import Store from '../models/Store.js';
import { handleInputWithValidation } from '../utils/handleInputWithValidation.js';
import ValidationService from '../services/ValidationService.js';
import PromotionService from '../services/PromotionService.js';

class StoreController {
  constructor() {
    this.store = new Store();
  }

  async start() {
    OutputView.printWelcomeMessage();
    this.store.initializeStore();

    await this.processPurchase();

    OutputView.printThankYouMessage();
  }

  async processPurchase() {
    OutputView.printProductList(this.store.products);

    const purchaseDetails = await this.getValidPurchaseDetails();

    // 추가 구매 여부 확인
    const validatedPurchaseDetails =
      await PromotionService.promptForAdditionalItems(
        purchaseDetails,
        this.store,
      );

    // 프로모션 적용 및 증정품 계산
    const updatedPurchaseDetails = validatedPurchaseDetails.map((item) => {
      const product = this.store.products.find((p) => p.name === item.name);
      return {
        ...item,
        price: product.price,
        totalPrice: product.price * item.quantity,
      };
    });

    // applyPromotions의 반환 값 비구조화
    const { gifts, updatedPurchaseDetails: finalPurchaseDetails } =
      await PromotionService.applyPromotions(
        updatedPurchaseDetails,
        this.store,
      );
    console.log('=== Apply Promotions Debugging ===');
    console.log('Final Purchase Details:', finalPurchaseDetails);
    console.log('Gifts:', gifts);

    // 재고 업데이트
    this.store.updateStock([...finalPurchaseDetails, ...gifts]);

    // 최종 영수증 출력
    this.printReceipt(finalPurchaseDetails, gifts);
  }

  async getValidPurchaseDetails() {
    return handleInputWithValidation(
      InputView.readProductAndQuantity,
      ValidationService.validatePurchaseInput,
      this.store.products,
    );
  }

  printReceipt(purchaseDetails, gifts) {
    const totalAmount = this.calculateTotalAmount(purchaseDetails);
    const promotionDiscount = this.calculatePromotionDiscount(gifts);
    const membershipDiscount = 3000;

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

  calculateTotalAmount(purchaseDetails) {
    return purchaseDetails.reduce(
      (total, { totalPrice }) => total + totalPrice,
      0,
    );
  }

  calculatePromotionDiscount(gifts) {
    return gifts.reduce((total, { name, quantity }) => {
      const product = this.store.products.find((p) => p.name === name);
      return total + product.price * quantity;
    }, 0);
  }
}

export default StoreController;
