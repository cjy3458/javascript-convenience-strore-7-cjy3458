import Store from './models/Store.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';

class App {
  constructor() {
    this.store = new Store();
  }

  async run() {
    OutputView.printWelcomeMessage();
    this.store.initializeStore();

    OutputView.printProductList(this.store.products);
  }
}

export default App;
