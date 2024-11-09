import ReceiptService from '../../src/services/ReceiptService';

describe('ReceiptService 단위 테스트 (영수증 출력)', () => {
  test('일반 상품 구매 영수증 출력', () => {
    const receiptDetails = {
      items: [
        { name: '콜라', quantity: 2, price: 2000 },
        { name: '사이다', quantity: 1, price: 1000 },
      ],
      gifts: [],
      totalAmount: 3000,
      promotionDiscount: 0,
      membershipDiscount: 0,
      finalAmount: 3000,
    };

    const receipt = ReceiptService.generateReceipt(receiptDetails);

    expect(receipt).toContain('==============W 편의점================');
    expect(receipt).toContain('상품명\t수량\t금액');
    expect(receipt).toContain('콜라\t2\t2,000');
    expect(receipt).toContain('사이다\t1\t1,000');
    expect(receipt).toContain('=============증 정===============');
    expect(receipt).toContain('총구매액\t3,000');
    expect(receipt).toContain('행사할인\t-0');
    expect(receipt).toContain('멤버십할인\t-0');
    expect(receipt).toContain('내실돈\t3,000');
  });

  test('프로모션 적용된 상품 영수증 출력', () => {
    const receiptDetails = {
      items: [{ name: '콜라', quantity: 2, price: 2000 }],
      gifts: [{ name: '콜라', quantity: 1 }],
      totalAmount: 2000,
      promotionDiscount: 1000,
      membershipDiscount: 0,
      finalAmount: 1000,
    };

    const receipt = ReceiptService.generateReceipt(receiptDetails);

    expect(receipt).toContain('콜라\t2\t2,000');
    expect(receipt).toContain('=============증 정===============');
    expect(receipt).toContain('콜라\t1');
    expect(receipt).toContain('총구매액\t2,000');
    expect(receipt).toContain('행사할인\t-1,000');
    expect(receipt).toContain('내실돈\t1,000');
  });

  test('멤버십 할인 적용된 상품 영수증 출력', () => {
    const receiptDetails = {
      items: [{ name: '비타민워터', quantity: 3, price: 4500 }],
      gifts: [],
      totalAmount: 4500,
      promotionDiscount: 0,
      membershipDiscount: 1350,
      finalAmount: 3150,
    };

    const receipt = ReceiptService.generateReceipt(receiptDetails);

    expect(receipt).toContain('비타민워터\t3\t4,500');
    expect(receipt).toContain('총구매액\t4,500');
    expect(receipt).toContain('행사할인\t-0');
    expect(receipt).toContain('멤버십할인\t-1,350');
    expect(receipt).toContain('내실돈\t3,150');
  });

  test('프로모션과 멤버십 할인 모두 적용된 영수증 출력', () => {
    const receiptDetails = {
      items: [{ name: '콜라', quantity: 4, price: 4000 }],
      gifts: [{ name: '콜라', quantity: 1 }],
      totalAmount: 4000,
      promotionDiscount: 1000,
      membershipDiscount: 900,
      finalAmount: 2100,
    };

    const receipt = ReceiptService.generateReceipt(receiptDetails);

    expect(receipt).toContain('콜라\t4\t4,000');
    expect(receipt).toContain('콜라\t1');
    expect(receipt).toContain('총구매액\t4,000');
    expect(receipt).toContain('행사할인\t-1,000');
    expect(receipt).toContain('멤버십할인\t-900');
    expect(receipt).toContain('내실돈\t2,100');
  });
});
