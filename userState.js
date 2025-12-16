// userState.js
let userState = loadProfiles();
let currentScreen = "home";
let currentScreenPayload = null;

function ensureDoodles() {
  if(!userState.doodles) userState.doodles = [];
}
