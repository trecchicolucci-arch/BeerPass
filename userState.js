function defaultUserState() {
  return {
    coins: 100,
    activePassId: null,
    pendingPurchaseId: null,
    pendingValidation: null,
    redemptions: [],
    reviews: [],
    badges: []
  };
}

function loadUserState() {
  try {
    return { ...defaultUserState(), ...JSON.parse(localStorage.getItem("userState")) };
  } catch {
    return defaultUserState();
  }
}

function saveUserState(state) {
  localStorage.setItem("userState", JSON.stringify(state));
}
