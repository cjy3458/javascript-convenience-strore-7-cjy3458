const MESSAGE = Object.freeze({
  WELCOME: '안녕하세요. W편의점입니다.',
  DISPLAY_PRODUCTS: '현재 보유하고 있는 상품입니다.\n',

  INPUT_PROMPT:
    '구매하실 상품명과 수)량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n',

  PROMOTION_PROMPT: (product, quantity) =>
    `현재 ${product}은(는) ${quantity}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`,

  PROMOTION_SHORTAGE_PROMPT: (product, quantity) =>
    `현재 ${product} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`,

  MEMBERSHIP_PROMPT: '멤버십 할인을 받으시겠습니까? (Y/N)\n',

  MORE_PURCHASE_PROMPT: '감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n',

  THANK_YOU: '감사합니다. 다음에 또 오세요!',

  RECEIPT_HEADER: '==============W 편의점================',
  RECEIPT_ITEMS_HEADER: '상품명\t\t수량\t금액',
  RECEIPT_GIFTS_HEADER: '=============증\t정===============',
  RECEIPT_FOOTER: '====================================',
  RECEIPT_TOTAL_AMOUNT: '총구매액',
  RECEIPT_PROMOTION_DISCOUNT: '행사할인',
  RECEIPT_MEMBERSHIP_DISCOUNT: '멤버십할인',
  RECEIPT_FINAL_AMOUNT: '내실돈',
});

export default MESSAGE;
