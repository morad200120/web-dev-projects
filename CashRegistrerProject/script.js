const cash = document.getElementById('cash');
const changeDue = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');
const priceInput = document.getElementById('price');
const drawerContainer = document.getElementById('drawer-container');

// Usare let per permettere riassegnazione nei test
let price = 19.5;

// Cash-in-drawer come array 2D secondo le specifiche FreeCodeCamp
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const currencyValues = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

// Funzione per generare gli elementi del cassetto
const genCashDrawerElements = (currency, value) => {
  const div = document.createElement('div');
  const currencySpan = document.createElement('span');
  const valueSpan = document.createElement('span');

  div.classList.add(
    'bg-white',
    'py-2',
    'rounded-sm',
    'px-3',
    'flex',
    'justify-between',
    'border',
    'border-[#E4E4E4]'
  );

  currencySpan.textContent = `${currency}:`;
  valueSpan.textContent = `${value.toFixed(2)}`;

  div.append(currencySpan, valueSpan);
  return div;
};

// Funzione per caricare gli elementi del cassetto
const loadCashDrawerElements = () => {
  drawerContainer.innerHTML = '';
  // Ordina le denominazioni dalla più alta alla più bassa per la visualizzazione
  const sortedCid = [...cid].sort((a, b) => currencyValues[b[0]] - currencyValues[a[0]]);

  sortedCid.forEach(([currency, value]) => {
    const element = genCashDrawerElements(currency, value);
    drawerContainer.appendChild(element);
  });
};

// Carica gli elementi al caricamento della pagina
window.onload = () => {
  loadCashDrawerElements();
};

const getChangeDue = () => {
  // Prendi il prezzo dall'input invece che dalla variabile fissa
  const itemPrice = Number(priceInput.value);
  let changeDueAmount = Math.round((Number(cash.value) - itemPrice) * 100) / 100;

  // Calcola il totale nel cassetto
  let totalCashInDrawer = 0;
  for (let i = 0; i < cid.length; i++) {
    totalCashInDrawer += cid[i][1];
  }
  totalCashInDrawer = Math.round(totalCashInDrawer * 100) / 100;

  // Se il cassetto ha esattamente il resto dovuto
  if (totalCashInDrawer === changeDueAmount) {
    let result = "Status: CLOSED";
    // Mostra tutte le denominazioni disponibili in ordine decrescente
    let cidCopy = [...cid];
    cidCopy.reverse();
    for (let i = 0; i < cidCopy.length; i++) {
      if (cidCopy[i][1] > 0) {
        result += ` ${cidCopy[i][0]}: $${cidCopy[i][1].toFixed(2)}`;
      }
    }
    changeDue.textContent = result;
    return;
  }

  // Se il cassetto ha meno del resto dovuto
  if (totalCashInDrawer < changeDueAmount) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // Algoritmo per calcolare il resto
  let changeArray = [];
  let remainingChange = changeDueAmount;

  // Ordina le denominazioni dalla più alta alla più bassa
  let sortedCurrency = Object.keys(currencyValues).sort((a, b) => currencyValues[b] - currencyValues[a]);

  for (let currency of sortedCurrency) {
    let currencyValue = currencyValues[currency];
    let availableAmount = 0;

    // Trova l'ammontare disponibile per questa denominazione
    for (let i = 0; i < cid.length; i++) {
      if (cid[i][0] === currency) {
        availableAmount = cid[i][1];
        break;
      }
    }

    if (remainingChange >= currencyValue && availableAmount > 0) {
      let amountToUse = 0;
      let tempChange = remainingChange;

      // Calcola quanto di questa denominazione usare
      while (tempChange >= currencyValue && amountToUse < availableAmount) {
        amountToUse = Math.round((amountToUse + currencyValue) * 100) / 100;
        tempChange = Math.round((tempChange - currencyValue) * 100) / 100;
      }

      if (amountToUse > 0) {
        changeArray.push(`${currency}: $${amountToUse.toFixed(2)}`);
        remainingChange = Math.round((remainingChange - amountToUse) * 100) / 100;

        // Aggiorna il cassetto
        for (let i = 0; i < cid.length; i++) {
          if (cid[i][0] === currency) {
            cid[i][1] = Math.round((cid[i][1] - amountToUse) * 100) / 100;
            break;
          }
        }
      }
    }
  }

  // Se non si riesce a dare il resto esatto
  if (remainingChange > 0) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // Resto calcolato con successo
  if (changeArray.length === 0) {
    changeDue.textContent = "No change due - customer paid with exact cash";
  } else {
    changeDue.textContent = "Status: OPEN " + changeArray.join(' ');
  }

  // Aggiorna la visualizzazione del cassetto
  loadCashDrawerElements();
};

purchaseBtn.addEventListener('click', () => {
  const itemPrice = Number(priceInput.value);
  const cashAmount = Number(cash.value);

  // Validazione input
  if (!priceInput.value || itemPrice <= 0) {
    alert('Please enter a valid item price');
    return;
  }

  if (!cash.value || cashAmount <= 0) {
    alert('Please enter a valid cash amount');
    return;
  }

  if (cashAmount < itemPrice) {
    alert('Customer does not have enough money to purchase the item');
  } else if (cashAmount === itemPrice) {
    changeDue.textContent = 'No change due - customer paid with exact cash';
  } else {
    getChangeDue();
  }
});