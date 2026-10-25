// 1. Grab the elements we need from the page
const scoreDisplay = document.getElementById("score");
const messageDisplay = document.getElementById("message");
const clickBtn = document.getElementById("click-btn");
const upgradeBtn = document.getElementById("upgrade-btn");
const autoBtn = document.getElementById("auto-btn");
const resetBtn = document.getElementById("reset-btn");

// 2. Game settings (change these to balance the game)
const UPGRADE_START_COST = 10;
const UPGRADE_COST_INCREASE = 10; // how much pricier each upgrade gets
const AUTO_COST = 25;

// 3. Keep track of the game's state
let score = 0;
let clickPower = 1;
let upgradeCost = UPGRADE_START_COST; // now a let, because it changes!
let autoClickTimer = null;

// 4. Update what the player sees
function updateDisplay() {
  scoreDisplay.textContent = score;
  clickBtn.textContent = "Click me! (+" + clickPower + ")";
  upgradeBtn.textContent = "Upgrade Power - " + upgradeCost + " pts";
}

function showMessage(text) {
  messageDisplay.textContent = text;
}

// 5. React to player actions
clickBtn.addEventListener("click", function () {
  score += clickPower;
  updateDisplay();
});

upgradeBtn.addEventListener("click", function () {
  if (score >= upgradeCost) {
    score -= upgradeCost;
    clickPower += 1;
    upgradeCost += UPGRADE_COST_INCREASE;
    clickBtn.classList.add("upgraded");
    showMessage("");
    updateDisplay();
  } else {
    showMessage("Not enough points! You need " + upgradeCost + ".");
  }
});

autoBtn.addEventListener("click", function () {
  if (score >= AUTO_COST) {
    score -= AUTO_COST;
    autoBtn.disabled = true;
    showMessage("");
    updateDisplay();

    // Runs this function every 1000 milliseconds (1 second)
    autoClickTimer = setInterval(function () {
      score += 1;
      updateDisplay();
    }, 1000);
  } else {
    showMessage("Not enough points! You need " + AUTO_COST + ".");
  }
});

resetBtn.addEventListener("click", function () {
  score = 0;
  clickPower = 1;
  upgradeCost = UPGRADE_START_COST;
  clickBtn.classList.remove("upgraded");
  autoBtn.disabled = false;
  clearInterval(autoClickTimer);
  autoClickTimer = null;
  showMessage("");
  updateDisplay();
});

// 6. Draw the starting screen
updateDisplay();