import PromotionService from '../../src/services/PromotionService';

describe('PromotionService 단위 테스트', () => {
  test('프로모션 조건 충족', () => {
    const purchaseDetails = { product: '콜라', quantity: 3 };
    const promotions = [{ product: '콜라', type: '2+1', stock: 10 }];
    expect(() =>
      PromotionService.applyPromotions(purchaseDetails, promotions),
    ).not.toThrow();
  });

  test('프로모션 조건 불충족', () => {
    const purchaseDetails = { product: '콜라', quantity: 1 }; // 2+1 조건 충족 못함
    const promotions = [{ product: '콜라', type: '2+1', stock: 10 }];
    expect(() =>
      PromotionService.applyPromotions(purchaseDetails, promotions),
    ).toThrow('[ERROR] 프로모션 조건을 충족하지 않았습니다.');
  });

  test('프로모션 재고 부족', () => {
    const purchaseDetails = { product: '탄산수', quantity: 7 }; // 초과 요청
    const promotions = [{ product: '탄산수', type: '2+1', stock: 5 }];
    expect(() =>
      PromotionService.applyPromotions(purchaseDetails, promotions),
    ).toThrow('[ERROR] 프로모션 재고가 부족합니다. 일부 정가로 결제됩니다.');
  });
});
