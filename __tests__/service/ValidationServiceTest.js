import ValidationService from '../../src/services/ValidationService.js';
import ERROR from '../../src/constants/error.js';

describe('ValidationService 단위 테스트', () => {
  test('올바른 입력 처리', () => {
    const input = '[콜라-2]';
    const products = [
      { name: '콜라', price: 1500, quantity: 10, promotionStock: 0 },
    ];
    expect(() =>
      ValidationService.validatePurchaseInput(input, products),
    ).not.toThrow();
  });

  test('입력 형식 오류', () => {
    const input = '콜라-2';
    const products = [
      { name: '콜라', price: 1500, quantity: 10, promotionStock: 0 },
    ];
    expect(() =>
      ValidationService.validatePurchaseInput(input, products),
    ).toThrow(ERROR.INVALID_INPUT_FORMAT);
  });

  test('존재하지 않는 상품', () => {
    const input = '[없는상품-2]';
    const products = [
      { name: '콜라', price: 1500, quantity: 10, promotionStock: 0 },
    ];
    expect(() =>
      ValidationService.validatePurchaseInput(input, products),
    ).toThrow(ERROR.PRODUCT_NOT_FOUND);
  });

  test('재고 초과 (일반 상품)', () => {
    const input = '[콜라-100]';
    const products = [
      { name: '콜라', price: 1500, quantity: 10, promotionStock: 0 },
    ];
    expect(() =>
      ValidationService.validatePurchaseInput(input, products),
    ).toThrow(ERROR.QUANTITY_EXCEEDED);
  });

  test('재고 초과 (프로모션 포함)', () => {
    const input = '[콜라-15]';
    const products = [
      {
        name: '콜라',
        price: 1500,
        quantity: 10,
        promotionStock: 4,
        promotion: true,
      },
    ];
    expect(() =>
      ValidationService.validatePurchaseInput(input, products),
    ).toThrow(ERROR.QUANTITY_EXCEEDED);
  });

  test('프로모션 포함 정상 처리', () => {
    const input = '[콜라-14]';
    const products = [
      {
        name: '콜라',
        price: 1500,
        quantity: 10,
        promotionStock: 4,
        promotion: true,
      },
    ];
    expect(() =>
      ValidationService.validatePurchaseInput(input, products),
    ).not.toThrow();
  });

  test('Yes/No 입력 처리 (Y)', () => {
    const decision = 'Y';
    expect(() =>
      ValidationService.validateYesNoDecision(decision),
    ).not.toThrow();
  });

  test('Yes/No 입력 처리 (N)', () => {
    const decision = 'N';
    expect(() =>
      ValidationService.validateYesNoDecision(decision),
    ).not.toThrow();
  });

  test('Yes/No 입력 처리 (잘못된 입력)', () => {
    const decision = 'INVALID';
    expect(() => ValidationService.validateYesNoDecision(decision)).toThrow(
      ERROR.INVALID_PROMOTION_RESPONSE,
    );
  });
});
