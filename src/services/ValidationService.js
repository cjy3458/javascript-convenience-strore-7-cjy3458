import ERROR from '../constants/error.js';
import CustomError from '../utils/CustomError.js';

class ValidationService {
  static validateInput(input, products) {
    if (!input) {
      throw new CustomError(ERROR.EMPTY_INPUT);
    }

    const matches = input.match(/\[.+?-\d+]/g);
    if (!matches) {
      throw new CustomError(ERROR.INVALID_INPUT_FORMAT);
    }

    matches.forEach((item) => {
      const [name, quantity] = ValidationService.parseItem(item);
      const product = products.find((p) => p.name === name);

      if (!product) {
        throw new CustomError(ERROR.PRODUCT_NOT_FOUND);
      }

      if (product.quantity < quantity) {
        throw new CustomError(ERROR.QUANTITY_EXCEEDED);
      }
    });
  }

  static parseItem(item) {
    const matches = item.match(/^\[(.+)-(\d+)]$/);
    if (!matches) {
      throw new CustomError(ERROR.INVALID_INPUT_FORMAT);
    }

    const name = matches[1];
    const quantity = Number(matches[2]);

    if (Number.isNaN(quantity) || quantity <= 0) {
      throw new CustomError(ERROR.INVALID_QUANTITY_TYPE);
    }

    return [name, quantity];
  }

  static validateYesNoDecision(decision) {
    if (!['Y', 'N'].includes(decision)) {
      throw new CustomError(ERROR.INVALID_PROMOTION_RESPONSE);
    }
  }
}

export default ValidationService;
