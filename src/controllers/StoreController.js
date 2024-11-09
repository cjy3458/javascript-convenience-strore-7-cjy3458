import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import Store from '../models/Store.js';
import { handleInputWithValidation } from '../utils/handleInputWithValidation.js';
import ValidationService from '../services/ValidationService.js';

class StoreController {
  constructor() {
    this.store = new Store();
  }

  async start() {
    OutputView.printWelcomeMessage();
    this.store.initializeStore();

    OutputView.printProductList(this.store.products);

    const purchaseDetails = await this.getValidPurchaseDetails();
    this.store.updateStock(purchaseDetails);
    OutputView.printProductList(this.store.products);
    OutputView.printThankYouMessage();
  }

  async getValidPurchaseDetails() {
    return handleInputWithValidation(
      InputView.readProductAndQuantity,
      ValidationService.validatePurchaseInput,
      this.store.products,
    );
  }
}

export default StoreController;
