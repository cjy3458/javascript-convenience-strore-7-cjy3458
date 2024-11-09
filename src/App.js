import StoreController from './controllers/StoreController.js';

class App {
  async run() {
    const controller = new StoreController();
    await controller.start();
  }
}

export default App;
