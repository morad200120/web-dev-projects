const palindromeDescription = document.querySelector("#palindrome-description");
const descriptionBtn = document.querySelector("#description-btn");
const menuArrow = document.querySelector("#menu-arrow");
const textInput = document.querySelector("#text-input");
const checkBtn = document.querySelector("#check-btn");
const resultContainer = document.querySelector("#result-container");
const result = document.querySelector("#result");

let isMenuOpen = false;

// Toggle menu arrow and description
menuArrow.addEventListener("click", () => {
  menuArrow.classList.toggle("rotate-180");
});

descriptionBtn.addEventListener("click", () => {
  palindromeDescription.classList.toggle("hidden");
  isMenuOpen = !isMenuOpen;
});

// Function to clean text for palindrome checking
function cleanText(text) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, ""); // Remove all non-alphanumeric characters
}

// Function to check if text is palindrome
function isPalindrome(text) {
  const cleaned = cleanText(text);
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}

// Function to display result
function displayResult(text, isPalin) {
  resultContainer.classList.remove("hidden");

  if (isPalin) {
    result.className =
      "p-4 rounded-2xl text-center font-medium text-sm bg-green-100 text-green-800 border-2 border-green-200";
    result.innerHTML = `
            <div class="flex items-center justify-center gap-2 mb-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span class="font-semibold">È un palindromo!</span>
            </div>
            <p>"<span class="font-medium">${text}</span>" si legge allo stesso modo in entrambe le direzioni.</p>
        `;
  } else {
    result.className =
      "p-4 rounded-2xl text-center font-medium text-sm bg-red-100 text-red-800 border-2 border-red-200";
    result.innerHTML = `
            <div class="flex items-center justify-center gap-2 mb-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                <span class="font-semibold">Non è un palindromo</span>
            </div>
            <p>"<span class="font-medium">${text}</span>" non si legge allo stesso modo in entrambe le direzioni.</p>
        `;
  }

  // Scroll to result
  resultContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Function to check palindrome
function checkPalindrome() {
  const text = textInput.value.trim();

  if (!text) {
    result.className =
      "p-4 rounded-2xl text-center font-medium text-sm bg-yellow-100 text-yellow-800 border-2 border-yellow-200";
    result.innerHTML = `
            <div class="flex items-center justify-center gap-2 mb-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
                <span class="font-semibold">Attenzione</span>
            </div>
            <p>Inserisci una parola o frase da verificare.</p>
        `;
    resultContainer.classList.remove("hidden");
    return;
  }

  const palindromeResult = isPalindrome(text);
  displayResult(text, palindromeResult);
}

// Event listeners
checkBtn.addEventListener("click", checkPalindrome);

textInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkPalindrome();
  }
});

// Clear result when input changes
textInput.addEventListener("input", () => {
  if (!resultContainer.classList.contains("hidden")) {
    resultContainer.classList.add("hidden");
  }
});

// Focus input on page load
window.addEventListener("load", () => {
  textInput.focus();
});
