const ERROR_TAG = '[ERROR]';

const ERROR = Object.freeze({
  INVALID_INPUT_FORMAT: {
    name: 'InvalidInputFormatError',
    message: `${ERROR_TAG} 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.`,
  },
  EMPTY_INPUT: {
    name: 'EmptyInputError',
    message: `${ERROR_TAG} 빈 값은 입력할 수 없습니다.`,
  },
  PRODUCT_NOT_FOUND: {
    name: 'ProductNotFoundError',
    message: `${ERROR_TAG} 존재하지 않는 상품입니다. 다시 입력해 주세요.`,
  },
  QUANTITY_EXCEEDED: {
    name: 'QuantityExceededError',
    message: `${ERROR_TAG} 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.`,
  },
  INVALID_QUANTITY_TYPE: {
    name: 'InvalidQuantityTypeError',
    message: `${ERROR_TAG} 수량은 숫자로 입력해야 합니다.`,
  },
  INVALID_PROMOTION_CONDITION: {
    name: 'InvalidPromotionConditionError',
    message: `${ERROR_TAG} 프로모션 조건을 충족하지 않았습니다.`,
  },
  PROMOTION_STOCK_EXCEEDED: {
    name: 'PromotionStockExceededError',
    message: `${ERROR_TAG} 프로모션 재고를 초과하여 혜택을 받을 수 없습니다.`,
  },
  INVALID_PROMOTION_RESPONSE: {
    name: 'InvalidPromotionResponseError',
    message: `${ERROR_TAG} Y 또는 N으로 입력해 주세요.`,
  },
  INVALID_MEMBERSHIP_RESPONSE: {
    name: 'InvalidMembershipResponseError',
    message: `${ERROR_TAG} 멤버십 할인 여부는 Y 또는 N으로 입력해 주세요.`,
  },
  INVALID_FILE_FORMAT: {
    name: 'InvalidFileFormatError',
    message: `${ERROR_TAG} 데이터 파일의 형식이 잘못되었습니다.`,
  },
  FILE_NOT_FOUND: {
    name: 'FileNotFoundError',
    message: `${ERROR_TAG} 상품 또는 프로모션 데이터 파일을 찾을 수 없습니다.`,
  },
  UNEXPECTED_ERROR: {
    name: 'UnexpectedError',
    message: `${ERROR_TAG} 예상하지 못한 오류가 발생했습니다. 다시 시도해 주세요.`,
  },
});

export default ERROR;
