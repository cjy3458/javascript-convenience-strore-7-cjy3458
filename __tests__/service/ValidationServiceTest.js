import ValidationService from '../../src/services/ValidationService';

describe('ValidationService 단위 테스트', () => {
  test('올바른 입력 처리', () => {
    const input = '[콜라-2]';
    const products = [{ name: '콜라', stock: 10 }];
    expect(() =>
      ValidationService.validateInput(input, products),
    ).not.toThrow();
  });

  test('입력 형식 오류', () => {
    const input = '콜라-2';
    const products = [{ name: '콜라', stock: 10 }];
    expect(() => ValidationService.validateInput(input, products)).toThrow(
      '[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.',
    );
  });

  test('존재하지 않는 상품', () => {
    const input = '[없는상품-2]';
    const products = [{ name: '콜라', stock: 10 }];
    expect(() => ValidationService.validateInput(input, products)).toThrow(
      '[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.',
    );
  });

  test('재고 초과', () => {
    const input = '[콜라-100]';
    const products = [{ name: '콜라', stock: 10 }];
    expect(() => ValidationService.validateInput(input, products)).toThrow(
      '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.',
    );
  });
});
