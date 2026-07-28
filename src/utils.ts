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

export function formatDueDate(invoiceDate: string) {
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const customDate = new Date(invoiceDate);
  const MONTH = MONTHS[customDate.getMonth()];
  const DAY = customDate.getDate();
  const YEAR = customDate.getFullYear();

  return `${DAY} ${MONTH} ${YEAR}`;
}

export function checkStatus(status: string, darkMode?: boolean) {
  let statusbg = "";

  switch (status) {
    case "paid":
      statusbg = `${darkMode ? "bg-emerald-50/5" : "bg-emerald-50"} before:bg-emerald-400 text-emerald-400`;
      break;

    case "pending":
      statusbg = `${darkMode ? "bg-pizazz/5" : "bg-pizazz/12"} before:bg-pizazz text-pizazz`;
      break;

    case "draft":
      statusbg = `${darkMode ? "bg-tranquil/50 before:bg-ana text-ana" : "bg-tranquil/12 before:bg-tranquil text-tranquil"}`;
      break;

    default:
      statusbg = "";
  }

  return statusbg;
}
