import ERROR from '../constants/error.js';
import CustomError from '../utils/CustomError.js';

class ValidationService {
  static validateInput(input, products) {
    if (!input) {
      throw new CustomError(ERROR.EMPTY_INPUT);
    }

    const matches = this.validateInputFormat(input);
    matches.forEach((item) => {
      const [name, quantity] = this.parseItem(item);
      this.validateProductExists(name, products);
      this.validateStockAvailability(name, quantity, products);
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

    if (!name || !quantity || Number.isNaN(quantity)) {
      throw new CustomError(ERROR.INVALID_INPUT_FORMAT);
    }

    return [name, Number(quantity)];
  }

  static validateProductExists(name, products) {
    const product = products.find((p) => p.name === name);
    if (!product) {
      throw new CustomError(ERROR.PRODUCT_NOT_FOUND.replace('{name}', name));
    }
  }

  static validateStockAvailability(name, quantity, products) {
    const product = products.find((p) => p.name === name);
    if (product.quantity < quantity) {
      throw new CustomError(ERROR.QUANTITY_EXCEEDED.replace('{name}', name));
    }
  }

  static validateYesNoDecision(decision) {
    if (!['Y', 'N'].includes(decision)) {
      throw new CustomError(ERROR.INVALID_PROMOTION_RESPONSE);
    }
  }
}

export default ValidationService;
