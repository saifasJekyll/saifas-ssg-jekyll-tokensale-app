let currentStep = 1;
    
function showStep(step) {
  document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
  document.querySelector(`.step:nth-child(${step})`).classList.add('active');
  document.querySelector('.current-step').innerText = step;

  const prevBtn = document.getElementById('prevBtn');
  if (step === 1) {
    prevBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'inline-block';
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
  }
}

document.addEventListener("DOMContentLoaded", function() {
  showStep(currentStep);
});

function selectToken(token) {
  document.querySelectorAll('.token-btn').forEach(btn => {
    btn.classList.remove('token-btn--active');
  });;

  const selectedBtn = document.querySelector(`.token-btn[data-token="${token}"]`);
  selectedBtn.classList.add('token-btn--active');
  
  console.log(`Selected token: ${token}`);
}

function convertTokens() {
  const input = document.getElementById('tokenAmount').value;

  const btcRate = 0.000037663;
  const eosRate = 0.42

  const eosResult = input * eosRate;
  const btcResult = input * btcRate;
  const usdResult = input * 1

  document.getElementById('eosResult').innerText = eosResult;
  document.getElementById('btcResult').innerText = btcResult;
  document.getElementById('usdResult').innerText = usdResult;
}