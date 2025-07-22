const input = document.querySelector("#number");
const convertBtn = document.querySelector("#convert-btn");
const output = document.querySelector("#output");

const romanNumeralMap = [
  { arabic: 1000, roman: "M" },
  { arabic: 900, roman: "CM" },
  { arabic: 500, roman: "D" },
  { arabic: 400, roman: "CD" },
  { arabic: 100, roman: "C" },
  { arabic: 90, roman: "XC" },
  { arabic: 50, roman: "L" },
  { arabic: 40, roman: "XL" },
  { arabic: 10, roman: "X" },
  { arabic: 9, roman: "IX" },
  { arabic: 5, roman: "V" },
  { arabic: 4, roman: "IV" },
  { arabic: 1, roman: "I" },
];

function converter(number) {
  let result = "";
  for (let romanNumber of romanNumeralMap) {
    if (number >= romanNumber.arabic) {
      const quotient = Math.floor(number / romanNumber.arabic);
      const resto = number % romanNumber.arabic;
      number = resto;
      result += romanNumber.roman.repeat(quotient);
    }
  }
  return result;
}

convertBtn.addEventListener("click", () => {
  const inputValue = input.value.trim();

  if (inputValue === "") {
    output.textContent = "Please enter a valid number";
  } else if (Number(inputValue) < 1) {
    output.textContent = "Please enter a number greater than or equal to 1";
  } else if (Number(inputValue) >= 4000) {
    output.textContent = "Please enter a number less than or equal to 3999";
  } else {
    output.textContent = converter(Number(inputValue));
  }
});
