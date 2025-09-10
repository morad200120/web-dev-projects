const checkButton = document.getElementById('check-btn');
const clearButton = document.getElementById('clear-btn');
const userInput = document.getElementById('user-input');
const resultsDiv = document.getElementById('results-div');

// Regex corretta per catturare tutti i formati richiesti
const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?(\d{3})[\s\-]?(\d{4})$/;

const addElement = (element, place) => {
  place.appendChild(element);
};

const checkInput = (userInput, regex) => {
  const match = userInput.match(regex);
  const paragraph = document.createElement('p');

  paragraph.classList.add('font-[Geist]');

  match
    ? (paragraph.textContent = `Valid US number: ${userInput.trim()}`)
    : (paragraph.textContent = `Invalid US number: ${userInput.trim()}`);

  addElement(paragraph, resultsDiv);
};

checkButton.addEventListener('click', () => {
  userInput.value
    ? checkInput(userInput.value, regex)
    : alert('Please provide a phone number');
});

clearButton.addEventListener('click', () => {
  resultsDiv.innerHTML = '';
});
