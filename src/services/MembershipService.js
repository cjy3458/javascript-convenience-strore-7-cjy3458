import { handleInputWithValidation } from '../utils/handleInputWithValidation.js';
import InputView from '../views/InputView.js';
import ValidationService from './ValidationService.js';

class MembershipService {
  static async getMembershipDiscount(purchaseDetails) {
    const decision = await handleInputWithValidation(
      InputView.readMembershipDecision,
      ValidationService.validateYesNoDecision,
    );

    if (decision === 'Y') {
      const nonDiscountedTotal = purchaseDetails.reduce((total, item) => {
        if (!item.isPromotion) {
          return total + item.totalPrice;
        }
        return total;
      }, 0);

      const discountedAmount = nonDiscountedTotal * 0.3;
      return Math.min(discountedAmount, 8000);
    }

    return 0;
  }
}

export default MembershipService;
