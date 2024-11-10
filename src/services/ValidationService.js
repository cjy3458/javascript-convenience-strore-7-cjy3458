import ERROR from '../constants/error.js';
import CustomError from '../utils/CustomError.js';

class ValidationService {
  static validatePurchaseInput(input, products) {
    if (!input) {
      throw new CustomError(ERROR.EMPTY_INPUT);
    }

    const matches = ValidationService.validateInputFormat(input);
    return matches.map((item) => {
      const [name, quantity] = ValidationService.parseItem(item);
      const product = ValidationService.validateProductExists(name, products);

      // 디버깅 메시지 추가
      console.log(`[DEBUG] Validating purchase input for: ${name}`);
      console.log(`Requested Quantity: ${quantity}`);
      console.log(`Product State:`, product);

      ValidationService.validateStockAvailability(product, quantity);

      return { name, quantity, price: product.price };
    });
  }

  static validateInputFormat(input) {
    const matches = input.match(/\[.+?-\d+]/g);
    if (!matches) {
      throw new CustomError(ERROR.INVALID_INPUT_FORMAT);
    }
    return matches;
  }

  static parseItem(item) {
    const strippedItem = item.replace(/^\[|\]$/g, '');
    const [name, quantity] = strippedItem.split('-');

    if (!name || !quantity || Number.isNaN(Number(quantity))) {
      throw new CustomError(ERROR.INVALID_INPUT_FORMAT);
    }

    return [name, Number(quantity)];
  }

  static validateProductExists(name, products) {
    const product = products.find((p) => p.name === name);
    if (!product) {
      throw new CustomError(ERROR.PRODUCT_NOT_FOUND);
    }
    return product;
  }

  static validateStockAvailability(product, quantity) {
    const { promotionStock, quantity: normalStock, name, promotion } = product;

    // 프로모션 없는 경우 처리
    if (!promotion) {
      if (quantity > normalStock) {
        console.log(`[ERROR] Not enough stock for ${name}`);
        throw new CustomError(ERROR.QUANTITY_EXCEEDED);
      }
      return;
    }
    console.log(promotion);

    // 프로모션 객체에서 buy, get 값 가져오기
    // const { buy, get } = promotion;
    // const bundleSize = 1 + 1;

    // 프로모션 재고로 처리 가능한 번들 수
    // const availablePromotionBundles = Math.floor(promotionStock / bundleSize);
    // const maxPromotionItems = availablePromotionBundles * 1;

    // 총 처리 가능한 재고
    const totalAvailableItems = product.quantity + product.promotionStock;

    console.log(`[DEBUG] Checking stock for: ${name}`);
    console.log(
      `Promotion Stock: ${promotionStock}, Normal Stock: ${normalStock}`,
    );
    console.log(
      `Requested Quantity: ${quantity}, Total Available Items: ${totalAvailableItems}`,
    );

    // 요청 수량 초과 시 에러
    if (quantity > totalAvailableItems) {
      console.log(`[ERROR] Not enough stock for ${name}`);
      throw new CustomError(ERROR.QUANTITY_EXCEEDED);
    }
  }

  static validateYesNoDecision(decision) {
    if (!['Y', 'N'].includes(decision)) {
      throw new CustomError(ERROR.INVALID_PROMOTION_RESPONSE);
    }
    return decision;
  }
}

export default ValidationService;
