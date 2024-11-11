// import InputView from '../views/InputView.js';
// import OutputView from '../views/OutputView.js';
// import Store from '../models/Store.js';
// import { handleInputWithValidation } from '../utils/handleInputWithValidation.js';
// import ValidationService from '../services/ValidationService.js';
// import PromotionService from '../services/PromotionService.js';

// class StoreController {
//   constructor() {
//     this.store = new Store();
//   }

//   async start() {
//     this.store.initializeStore();

//     await this.processPurchaseCycle();
//   }

//   async processPurchaseCycle() {
//     OutputView.printWelcomeMessage();
//     await this.processPurchase();

//     const continueShopping = await this.askForMorePurchase();
//     if (continueShopping) {
//       await this.processPurchaseCycle();
//     }
//   }

//   async processPurchase() {
//     OutputView.printProductList(this.store.products);

//     const purchaseDetails = await this.getValidPurchaseDetails();
//     const validatedPurchaseDetails =
//       await PromotionService.promptForAdditionalItems(
//         purchaseDetails,
//         this.store,
//       );

//     const updatedPurchaseDetails = validatedPurchaseDetails.map((item) => {
//       const product = this.store.products.find((p) => p.name === item.name);
//       return {
//         ...item,
//         price: product.price,
//         totalPrice: product.price * item.quantity,
//         isPromotion: product.promotionStock > 0,
//       };
//     });

//     const { gifts, updatedPurchaseDetails: finalPurchaseDetails } =
//       await PromotionService.applyPromotions(
//         updatedPurchaseDetails,
//         this.store,
//       );

//     const membershipDiscount =
//       await this.getMembershipDiscount(finalPurchaseDetails);

//     this.printReceipt(finalPurchaseDetails, gifts, membershipDiscount);
//   }

//   async askForMorePurchase() {
//     const decision = await handleInputWithValidation(
//       InputView.readMorePurchaseDecision,
//       ValidationService.validateYesNoDecision,
//     );

//     return decision === 'Y';
//   }

//   async getValidPurchaseDetails() {
//     return handleInputWithValidation(
//       InputView.readProductAndQuantity,
//       ValidationService.validatePurchaseInput,
//       this.store.products,
//     );
//   }

//   async getMembershipDiscount(purchaseDetails) {
//     const decision = await handleInputWithValidation(
//       InputView.readMembershipDecision,
//       ValidationService.validateYesNoDecision,
//     );

//     if (decision === 'Y') {
//       const nonDiscountedTotal = purchaseDetails.reduce((total, item) => {
//         if (!item.isPromotion) {
//           return total + item.totalPrice;
//         }
//         return total;
//       }, 0);

//       const discountedAmount = nonDiscountedTotal * 0.3;
//       return Math.min(discountedAmount, 8000);
//     }

//     return 0;
//   }

//   printReceipt(purchaseDetails, gifts, membershipDiscount) {
//     const totalAmount = this.calculateTotalAmount(purchaseDetails);
//     const promotionDiscount = this.calculatePromotionDiscount(gifts);

//     const finalAmount = totalAmount - promotionDiscount - membershipDiscount;

//     OutputView.printReceipt({
//       items: purchaseDetails,
//       gifts,
//       totalAmount,
//       promotionDiscount,
//       membershipDiscount,
//       finalAmount,
//     });
//   }

//   calculateTotalAmount(purchaseDetails) {
//     return purchaseDetails.reduce(
//       (total, { totalPrice }) => total + totalPrice,
//       0,
//     );
//   }

//   calculatePromotionDiscount(gifts) {
//     return gifts.reduce((total, { name, quantity }) => {
//       const product = this.store.products.find((p) => p.name === name);
//       return total + product.price * quantity;
//     }, 0);
//   }
// }

// export default StoreController;

import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import Store from '../models/Store.js';
import PurchaseService from '../services/PurchaseService.js';

class StoreController {
  constructor() {
    this.store = new Store();
    this.purchaseService = new PurchaseService(this.store);
  }

  async start() {
    this.store.initializeStore();

    await this.processPurchaseCycle();
  }

  async processPurchaseCycle() {
    OutputView.printWelcomeMessage();
    await this.purchaseService.handlePurchase();

    const continueShopping = await this.askForMorePurchase();
    if (continueShopping) {
      await this.processPurchaseCycle();
    }
  }

  async askForMorePurchase() {
    const decision = await InputView.readMorePurchaseDecision();
    return decision === 'Y';
  }
}

export default StoreController;
