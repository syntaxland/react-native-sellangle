// formatUserInput .js
export function formatUserInput(input) {
  // Convert the input to a string
  const inputString = input.toString();

  // Format the integer part
  const formattedInput = inputString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return formattedInput;
}

