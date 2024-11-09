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

      ValidationService.validateStockAvailability(product, quantity);

      return { name, quantity };
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
    if (!Array.isArray(products)) {
      throw new CustomError(ERROR.INVALID_PRODUCT_LIST);
    }

    const product = products.find((p) => p.name === name);
    if (!product) {
      throw new CustomError(ERROR.PRODUCT_NOT_FOUND);
    }
    return product;
  }

  static validateStockAvailability(product, quantity) {
    if (product.quantity < quantity) {
      throw new CustomError(ERROR.QUANTITY_EXCEEDED);
    }
  }

  static validateYesNoDecision(decision) {
    if (!['Y', 'N'].includes(decision)) {
      throw new CustomError(ERROR.INVALID_PROMOTION_RESPONSE);
    }
  }
}

export default ValidationService;
