let currentStep = 1;
let usdAmount = 0
let btcAmount = 0
let eosAmount = 0
let selectedToken = "eos"
let yourAccount = ""
    
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
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
    document.querySelector(`.dot:nth-child(${currentStep + 1})`).classList.remove('dot--active');
  }
}

function nextStep() {
  const steps = document.getElementById('steps').getAttribute('data-steps');
  if (currentStep < steps) {
    currentStep++;
    showStep(currentStep);
    document.querySelector(`.dot:nth-child(${currentStep})`).classList.add('dot--active');
    document.getElementById('usdAmount').innerText = usdAmount;
    document.getElementById('eosAmount').innerText = eosAmount;
    document.getElementById('btcAmount').innerText = btcAmount;
    document.getElementById('selectedToken').innerText = selectedToken.toUpperCase();
    document.getElementById('yourAccount').innerText = document.getElementById('accountName').value;
    const eosAddresses = document.getElementById('eosAddresses')
    const btcAddresses = document.getElementById('btcAddresses')
    if (selectedToken === 'eos') {
      document.getElementById('usdAmountResultForEos').innerText = usdAmount;
      btcAddresses.style.display = 'none'
      eosAddresses.style.display = 'block';
    } else {
      document.getElementById('usdAmountResultForBtc').innerText = usdAmount;
      btcAddresses.style.display = 'block'
      eosAddresses.style.display = 'none';
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  showStep(currentStep);
});

function selectToken(token) {
  document.querySelectorAll('.token-btn').forEach(btn => {
    btn.classList.remove('token-btn--active');
  });

  const selectedBtn = document.querySelector(`.token-btn[data-token="${token}"]`);
  selectedBtn.classList.add('token-btn--active');
  selectedToken = token;
  console.log(`Selected token: ${token}`);
}

function convertTokens() {
  const input = document.getElementById('tokenAmount').value;
  // Dummy rates
  const btcRate = 0.0037663;
  const eosRate = 0.42
  //

  const eosResult = input * eosRate;
  const btcResult = input * btcRate;
  const usdResult = input * 1;

  usdAmount = usdResult;
  eosAmount = eosResult;
  btcAmount = btcResult; 

  document.getElementById('eosResult').innerText = eosResult;
  document.getElementById('btcResult').innerText = btcResult;
  document.getElementById('usdResult').innerText = usdResult;
}