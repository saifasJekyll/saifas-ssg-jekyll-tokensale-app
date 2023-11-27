// Global variables
let paymentMethods = null;
let currentStepNumber = 1;

let usdAmount = 0

let calculatedTokens = [];

let selectedToken = "eos"
let accountName = ""

// Initialize
document.addEventListener("DOMContentLoaded", function(event) {
  setup()
  showStep(currentStepNumber);
});

function setup () {
  paymentMethods = JSON.parse(document.getElementById('payment-methods').getAttribute('data-methods'))
}

// Displaying steps logic
function showStep(step) {
  document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
  document.querySelector(`.step:nth-child(${step})`).classList.add('active');
  document.querySelector('.current-step').innerText = step;

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn')
  if (step === 1) {
    prevBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'inline-block';
  }
  if (step === 4) {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'inline-block';
  }
}

function prevStep() {
  if (currentStepNumber > 1) {
    currentStepNumber--;
    showStep(currentStepNumber);
    document.querySelector(`.dot:nth-child(${currentStepNumber + 1})`).classList.remove('dot--active');
  }
}

function nextStep() {
  const steps = document.getElementById('steps').getAttribute('data-steps');
  if (currentStepNumber < steps) {
    currentStepNumber++;
    showStep(currentStepNumber);
    document.querySelector(`.dot:nth-child(${currentStepNumber})`).classList.add('dot--active');
    document.getElementById('usdAmount').innerText = usdAmount;
    document.getElementById('selectedToken').innerText = selectedToken.toUpperCase();
    document.getElementById('accountName').innerText = document.getElementById('accountName').value;
    if (currentStepNumber === 4) {
      /// Generate final step
      const address = paymentMethods.find(item => item.name === selectedToken.toUpperCase()).wallet_address
      const totalAmount = calculatedTokens.find(item => item.name === selectedToken.toUpperCase()).value
      const accountName = document.getElementById('accountName').value;
      document.getElementById('requisites').innerHTML = `
        <div class="finalise-purchase-block">
          <div style="border-bottom: 1px solid #FFF; display: flex; padding: 10px 0;">
            <div style="white-space: nowrap;">${selectedToken.toUpperCase()} Address:</div>
            <div style="margin: 0 4px;">${address}</div>
          </div>
          <div style="border-bottom: 1px solid #FFF; display: flex; padding: 10px 0;">
            <div>with the memo:</div>
            <div style="margin: 0 4px;">${accountName}</div>
          </div>
          <div style="border-bottom: 1px solid #FFF; display: flex; padding: 10px 0;">
            <div>${selectedToken.toUpperCase()} Amount:</div>
            <div style="margin: 0 4px;">${totalAmount}</div>
          </div>
          <div style="border-bottom: 1px solid #FFF; display: flex; padding: 10px 0;">
            <div>USD Amount:</div>
            <div style="margin: 0 4px;">${usdAmount}</div>
          </div>
        </div>
        <div style="font-size: 12px; margin-bottom: 20px; margin-top: 10px; font-family: 'Work Sans', sans-serif;">Tokens will be transferred to your account in a few minutes.</div>
      `
    }
  }
}

function selectToken(token) {
  document.querySelectorAll('.token-btn').forEach(btn => {
    btn.classList.remove('token-btn--active');
  });

  const selectedBtn = document.querySelector(`.token-btn[data-token="${token}"]`);
  selectedBtn.classList.add('token-btn--active');
  selectedToken = token.toLowerCase();
  console.log(`Selected token: ${token}`);
}

function convertTokens() {
  const input = document.getElementById('tokenAmount').value;
  const usdResult = input;

  usdAmount = usdResult;

  paymentMethods.forEach(token => {
    document.getElementById(`${token.name}Result`).innerText = input * token.rate;
    if (!calculatedTokens.find(item => item.name === token.name)) {
      calculatedTokens.push({
        name: token.name,
        value: input * token.rate
      })
    } else {
      const currentToken = calculatedTokens.find(item => item.name === token.name)
      currentToken.value = input * token.rate
    }
  })
  document.getElementById('usdResult').innerText = usdResult || 0;
}