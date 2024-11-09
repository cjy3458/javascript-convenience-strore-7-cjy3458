import OutputView from '../views/OutputView.js';

export async function handleInputWithValidation(
  inputFn,
  validationFn,
  ...args
) {
  try {
    const input = await inputFn();
    validationFn(input, ...args);
    return input;
  } catch (error) {
    OutputView.printError(error.message, error.name);
    return handleInputWithValidation(inputFn, validationFn, ...args);
  }
}
