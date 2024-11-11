import PromotionService from './PromotionService.js';
import OutputView from '../views/OutputView.js';
import InputView from '../views/InputView.js';
import { handleInputWithValidation } from '../utils/handleInputWithValidation.js';
import ValidationService from './ValidationService.js';
import MembershipService from './MembershipService.js';
import ReceiptService from './ReceiptService.js';

class PurchaseService {
  constructor(store) {
    this.store = store;
  }

  async handlePurchase() {
    OutputView.printProductList(this.store.products);

    const purchaseDetails = await this.getValidPurchaseDetails();
    const validatedPurchaseDetails =
      await PromotionService.promptForAdditionalItems(
        purchaseDetails,
        this.store,
      );

    const updatedPurchaseDetails = validatedPurchaseDetails.map((item) => {
      const product = this.store.products.find((p) => p.name === item.name);
      return {
        ...item,
        price: product.price,
        totalPrice: product.price * item.quantity,
        isPromotion: product.promotionStock > 0,
      };
    });

    const { gifts, updatedPurchaseDetails: finalPurchaseDetails } =
      await PromotionService.applyPromotions(
        updatedPurchaseDetails,
        this.store,
      );

    const membershipDiscount =
      await MembershipService.getMembershipDiscount(finalPurchaseDetails);

    ReceiptService.printReceipt(
      finalPurchaseDetails,
      gifts,
      membershipDiscount,
      this.store,
    );
  }

  async getValidPurchaseDetails() {
    return handleInputWithValidation(
      InputView.readProductAndQuantity,
      ValidationService.validatePurchaseInput,
      this.store.products,
    );
  }
}

export default PurchaseService;
