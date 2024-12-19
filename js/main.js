const cells = document.querySelectorAll(".cell");
const winnerMessage = document.querySelector(".winner-message");
const winnerText = document.querySelector(".winner-text");
const nextRoundButton = document.querySelector(".next-round-button");
const scoreX = document.querySelector("#scoreX");
const scoreO = document.querySelector("#scoreO");
const gamemodeButtons = document.querySelectorAll(".gamemode-button");

const playerXNameInput = document.querySelector("#playerX");
const playerONameInput = document.querySelector("#playerO");
const startGameButton = document.querySelector(".start-game-button");
const playerNamesSection = document.querySelector(".player-names");

let currentPlayer = "X";
let boardState = Array(9).fill(null);
let score = { X: 0, O: 0 };
let gamemode = "";
let playerNames = {
  X: "Speler X",
  O: "Speler O"
};

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const badwords = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];  

function validateName(name) {
  const nameLowerCase = name.toLowerCase();
  return badwords.some(badword => nameLowerCase.includes(badword));
}

function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
  });
}

function isDraw() {
  return boardState.every(cell => cell !== null);
}

function handleClick(event) {
  const index = event.target.dataset.index;
  if (boardState[index] === null && winnerMessage.classList.contains("hidden") && score.X < 5 && score.O < 5) {
    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer);

    if (checkWinner()) {
      score[currentPlayer]++;
      updateScoreboard();
      winnerText.textContent = `${playerNames[currentPlayer]} wint deze ronde!`;
      winnerMessage.classList.remove("hidden");

      if (score[currentPlayer] === 5) {
        winnerText.textContent = `${playerNames[currentPlayer]} heeft 5 punten behaald en gewonnen!`;
        nextRoundButton.textContent = "Play again";
        nextRoundButton.classList.remove("hidden");
        cells.forEach(cell => cell.removeEventListener("click", handleClick));
      } else {
        nextRoundButton.textContent = "Next Round";
        nextRoundButton.classList.remove("hidden");
      }
    } else if (isDraw()) {
      winnerText.textContent = "Het is een gelijkspel!";
      winnerMessage.classList.remove("hidden");
      nextRoundButton.textContent = "Next Round";
      nextRoundButton.classList.remove("hidden");
      cells.forEach(cell => cell.removeEventListener("click", handleClick));
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";

      if (gamemode === "computer" && currentPlayer === "O") {
        setTimeout(computerMove, 500);
      }
    }
  }
}

function computerMove() {
  const availableCells = boardState
    .map((value, index) => (value === null ? index : null))
    .filter(index => index !== null);
  const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

  if (randomIndex !== undefined) {
    const cell = cells[randomIndex];
    cell.click();
  }
}

function updateScoreboard() {
  scoreX.textContent = score.X;
  scoreO.textContent = score.O;
  document.querySelector("#scoreboard-playerX").textContent = `${playerNames.X}: ${score.X}`;
  document.querySelector("#scoreboard-playerO").textContent = `${playerNames.O}: ${score.O}`;
}

function startNextRound() {
  boardState.fill(null);
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
  currentPlayer = "X";
  winnerMessage.classList.add("hidden");
  nextRoundButton.classList.add("hidden");
  cells.forEach(cell => cell.addEventListener("click", handleClick));
}

function resetGame() {
  score.X = 0;
  score.O = 0;
  updateScoreboard();
  boardState.fill(null);
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
  currentPlayer = "X";
  winnerMessage.classList.add("hidden");
  nextRoundButton.classList.add("hidden");
  cells.forEach(cell => cell.addEventListener("click", handleClick));
}

function selectGamemode(mode) {
  gamemode = mode;
  if (mode === "player") {
    document.querySelector(".gamemode-selection").classList.add("hidden");
    playerNamesSection.classList.remove("hidden");
  } else {
    startGameForComputer();
  }
}

function startGameForComputer() {
  gamemode = "computer";
  startGame();
}

function startGame() {
  const playerXName = playerXNameInput.value.trim();
  const playerOName = playerONameInput.value.trim();

  if (validateName(playerXName) || validateName(playerOName)) {
    alert("Je naam bevat ongepaste woorden. Kies een andere naam.");
    return;
  }

  playerNames.X = playerXName || "Speler X";
  playerNames.O = playerOName || "Speler O";

  document.querySelector(".gamemode-selection").classList.add("hidden");
  playerNamesSection.classList.add("hidden");
  document.querySelector(".board").classList.remove("hidden");
  document.querySelector(".scoreboard").classList.remove("hidden");

  updateScoreboard();

  cells.forEach(cell => cell.addEventListener("click", handleClick));
}

nextRoundButton.classList.add("hidden");

gamemodeButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (!gamemode) {
      selectGamemode(button.dataset.mode);
    }
  });
});

startGameButton.addEventListener("click", startGame);

nextRoundButton.addEventListener("click", function() {
  if (score.X === 5 || score.O === 5) {
    resetGame();
  } else {
    startNextRound();
  }
});




















  