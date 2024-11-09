import Store from './models/Store.js';

class App {
  async run() {
    const store = new Store();
    store.initializeStore();
  }
}

export default App;
