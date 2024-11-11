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
