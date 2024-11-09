import CalculationService from '../../src/services/CalculationService';

describe('CalculationService 단위 테스트', () => {
  test('총구매액 계산', () => {
    const purchaseDetails = [
      { price: 1000, quantity: 3 },
      { price: 2000, quantity: 2 },
    ];
    const totalAmount =
      CalculationService.calculateTotalAmount(purchaseDetails);
    expect(totalAmount).toBe(7000);
  });

  test('프로모션 할인 적용', () => {
    const promotions = [{ product: '콜라', discount: 2000 }];
    const discountedAmount =
      CalculationService.calculatePromotionDiscount(promotions);
    expect(discountedAmount).toBe(2000);
  });

  test('멤버십 할인 적용', () => {
    const remainingAmount = 30000;
    const discount = CalculationService.applyMembershipDiscount(
      remainingAmount,
      0.3,
      8000,
    );
    expect(discount).toBe(8000);
  });

  test('최종 결제 금액 계산', () => {
    const totalAmount = 30000;
    const promotionDiscount = 5000;
    const membershipDiscount = 8000;
    const finalAmount = CalculationService.calculateFinalAmount(
      totalAmount,
      promotionDiscount,
      membershipDiscount,
    );
    expect(finalAmount).toBe(17000);
  });
});
