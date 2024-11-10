import InputView from '../views/InputView.js';
import ERROR from '../constants/error.js';
import CustomError from '../utils/CustomError.js';
import { handleInputWithValidation } from '../utils/handleInputWithValidation.js';
import ValidationService from './ValidationService.js';

class PromotionService {
  static async promptForAdditionalItems(purchaseDetails, store) {
    const updatedDetails = await Promise.all(
      purchaseDetails.map((item) =>
        PromotionService.processSingleItem(item, store),
      ),
    );
    return updatedDetails;
  }

  static async processSingleItem(item, store) {
    const product = PromotionService.findProduct(store.products, item.name);
    const promotion = PromotionService.findPromotion(
      store.promotions,
      product.promotion,
    );

    if (!promotion || !promotion.isApplicable()) {
      return item;
    }

    const remainingQuantity = PromotionService.calculateRemainingQuantity(
      item.quantity,
      promotion.buy,
      promotion.get,
    );

    if (remainingQuantity > 0) {
      const decision = await InputView.readPromotionDecision(
        product.name,
        remainingQuantity,
      );

      if (decision === 'Y') {
        return { ...item, quantity: item.quantity + remainingQuantity };
      }
    }

    return item;
  }

  static async applyPromotions(purchaseDetails, store) {
    const results = await Promise.all(
      purchaseDetails.map((item) =>
        PromotionService.processPromotionForItem(item, store),
      ),
    );

    const gifts = [];
    const updatedPurchaseDetails = [];

    results.forEach(({ newItem, newGifts }) => {
      if (newItem) updatedPurchaseDetails.push(newItem);
      if (newGifts.length > 0) gifts.push(...newGifts);
    });

    return { gifts, updatedPurchaseDetails };
  }

  static async processPromotionForItem(item, store) {
    const product = PromotionService.findProduct(store.products, item.name);
    const promotion = PromotionService.findPromotion(
      store.promotions,
      product.promotion,
    );

    if (!promotion || !promotion.isApplicable()) {
      product.reduceStock(item.quantity);
      return { newItem: item, newGifts: [] };
    }

    const { buy, get } = promotion;

    const totalBundles = Math.floor(item.quantity / buy);
    const totalFreeItems = totalBundles * get;

    const totalRequiredStock = item.quantity + totalFreeItems;

    const availablePromotionStock = Math.min(
      product.promotionStock,
      totalRequiredStock,
    );
    const usedBundles = Math.floor(availablePromotionStock / (buy + get));
    const discountedQuantity = usedBundles * (buy + get);
    const providedFreeItems = usedBundles * get;

    const remainingQuantity = item.quantity - discountedQuantity;
    const shortage = totalRequiredStock - availablePromotionStock;

    if (item.quantity > product.promotionStock) {
      const shortageResult = await PromotionService.handleShortage(
        item,
        product,
        discountedQuantity,
        providedFreeItems,
        remainingQuantity,
        shortage,
      );
      return shortageResult;
    }
    product.reducePromotionStock(availablePromotionStock);
    return {
      newItem: item,
      newGifts: [{ name: product.name, quantity: providedFreeItems }],
    };
  }

  static calculateRemainingQuantity(currentQuantity, buy, get) {
    if (currentQuantity < buy) {
      return 0;
    }

    if (currentQuantity === buy) {
      return get;
    }

    const remainder = currentQuantity % buy;
    if (currentQuantity % (buy + get) === 0) {
      return 0;
    }

    if (
      currentQuantity % (buy + get) !== 0 &&
      currentQuantity - buy === buy + get
    ) {
      return get;
    }

    return remainder;
  }

  static findProduct(products, name) {
    const product = products.find((p) => p.name === name);
    if (!product) {
      throw new CustomError(ERROR.PRODUCT_NOT_FOUND);
    }
    return product;
  }

  static findPromotion(promotions, promotionName) {
    if (!promotionName) return null;
    const promotion = promotions.find((promo) => promo.name === promotionName);
    if (!promotion) {
      throw new CustomError(ERROR.PROMOTION_NOT_FOUND);
    }
    return promotion;
  }

  static async handleShortage(
    item,
    product,
    discountedQuantity,
    providedFreeItems,
    shortage,
  ) {
    const decision = await handleInputWithValidation(
      async () =>
        InputView.readPromotionShortageDecision(product.name, shortage),
      ValidationService.validateYesNoDecision,
    );

    console.log(decision);

    let newItem;
    if (decision === 'Y') {
      newItem = {
        ...item,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
      };
    } else {
      newItem = { ...item, quantity: discountedQuantity };
    }

    const newGifts =
      providedFreeItems > 0
        ? [{ name: product.name, quantity: providedFreeItems }]
        : [];

    product.reduceStock(shortage);

    return { newItem, newGifts };
  }
}

export default PromotionService;
