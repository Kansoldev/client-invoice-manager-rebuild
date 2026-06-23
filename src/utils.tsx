export function capitalizeFirstLetter(value: string) {
  return value.substring(0, 1).toUpperCase() + value.substring(1);
}

export function generateRandomString() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  // Generate 2 random letters
  let randomLetters = "";
  for (let i = 0; i < 2; i++) {
    randomLetters += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Generate 4 random numbers
  let randomNumbers = "";
  for (let i = 0; i < 4; i++) {
    randomNumbers += Math.floor(Math.random() * 10);
  }

  // Combine and shuffle the characters
  const combined = (randomLetters + randomNumbers).split("");
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  return combined.join("");
}
