export const WITTY_PAYING_QUOTES = [
  "The universe has spoken. Your wallet disagrees.",
  "Congratulations. Unfortunately.",
  "Your friends believe in you. Financially.",
  "No appeals. No refunds.",
  "Tonight's chosen sponsor has been found.",
  "A moment of silence for your bank balance.",
  "Generosity is a virtue. Especially tonight.",
  "May your card swipe smoothly without tears.",
];

export const WITTY_FOOD_QUOTES = [
  "Stop scrolling through menus. That's dinner.",
  "Fate has excellent taste.",
  "The group has spoken. Order it.",
  "No more 'I don't mind, whatever you want.' This is it.",
  "May your delivery arrive hot and speedy.",
  "Tonight's culinary destiny has been sealed.",
  "No arguments, no compromises. Feast time.",
  "Your cravings have officially been overruled by the wheel.",
];

export const WITTY_PLACE_QUOTES = [
  "Pack nothing. Bring vibes.",
  "The group has spoken. Start moving.",
  "Decision made. No more suggestions.",
  "Destination locked. Don't be the friend who is always late.",
  "Pack the car. Let's make memories (or regrets).",
  "The debate is officially terminated. Put on your shoes.",
  "No turning back now. Point Google Maps and drive.",
];

export const WITTY_WATCH_QUOTES = [
  "Popcorn is now legally required.",
  "No more scrolling. Press play.",
  "Fate has excellent taste.",
  "The group has spoken. Hit play.",
  "Silence your phones. Dim the lights.",
  "The trailer phase is over. Enjoy the feature.",
];

export const WITTY_MUSIC_QUOTES = [
  "Choose wisely. Everyone's listening.",
  "One phone. Unlimited power.",
  "The aux is yours. Don't mess this up.",
  "Your playlist. Their suffering.",
  "Skip privilege revoked for everyone else.",
  "No Bluetooth hijacking allowed.",
];

export const WITTY_TASK_QUOTES = [
  "Nobody volunteered. So fate did.",
  "Congratulations. You have a job now.",
  "The group has spoken. Please proceed.",
  "Your heroic moment has arrived.",
  "You were doing fine until this website happened.",
  "Duty calls. Excuses are not accepted.",
];

export function getRandomPayingQuote() {
  const index = Math.floor(Math.random() * WITTY_PAYING_QUOTES.length);
  return WITTY_PAYING_QUOTES[index];
}

export function getRandomFoodQuote() {
  const index = Math.floor(Math.random() * WITTY_FOOD_QUOTES.length);
  return WITTY_FOOD_QUOTES[index];
}

export function getRandomPlaceQuote() {
  const index = Math.floor(Math.random() * WITTY_PLACE_QUOTES.length);
  return WITTY_PLACE_QUOTES[index];
}

export function getRandomWatchQuote() {
  const index = Math.floor(Math.random() * WITTY_WATCH_QUOTES.length);
  return WITTY_WATCH_QUOTES[index];
}

export function getRandomMusicQuote() {
  const index = Math.floor(Math.random() * WITTY_MUSIC_QUOTES.length);
  return WITTY_MUSIC_QUOTES[index];
}

export function getRandomTaskQuote() {
  const index = Math.floor(Math.random() * WITTY_TASK_QUOTES.length);
  return WITTY_TASK_QUOTES[index];
}

export function getRandomQuote(categoryType = 'paying') {
  if (categoryType === 'food') {
    return getRandomFoodQuote();
  }
  if (categoryType === 'place') {
    return getRandomPlaceQuote();
  }
  if (categoryType === 'watch') {
    return getRandomWatchQuote();
  }
  if (categoryType === 'music') {
    return getRandomMusicQuote();
  }
  if (categoryType === 'task') {
    return getRandomTaskQuote();
  }
  return getRandomPayingQuote();
}
