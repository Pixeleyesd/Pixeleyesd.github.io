const answers = {
  1: { value: "C", label: "Syria", meaning: "Bana comes from Syria." },
  2: { value: "C", label: "2009", meaning: "Bana Al Abed was born in 2009." },
  3: { value: ["new zealand", "auckland"], label: "New Zealand or Auckland", meaning: "She comes from Auckland, New Zealand." },
  4: { value: "1998", label: "1998", meaning: "Brianna Fruean was born at the 18th of May 1998." },
  5: { value: "A", label: "Broadcasts information about biodiversity on TV", meaning: "David Attenborough broadcasts info about wildlife and biodiversity on TV." },
  6: { value: "B", label: "Rats", meaning: "The only animal David Attenborough hates is Rats." },
  7: { value: "C", label: "Participated in an unauthorised protest", meaning: "Joshua Wong was protesting against the police being unreasonably brutal to protesters." },
  8: { value: ["china", "hong kong"], label: "Hong Kong or China", meaning: "He comes from Hong Kong, China." },
  9: { value: "D", label: "The Black Lives Matter Movement", meaning: "Alicia Garza founded #BlackLivesMatter." },
  10: { value: ["USA", "United States of America", "The US of A", "The US", "America", "Merica", "Merca", "'Merica", "'Merca", "US", "The USA", "The United States of America", "LA", "Los Angeles", "California"], label: "LA, California, USA", meaning: "She comes from Los Angeles, California, United States." },
  11: { value: "B", label: "Education for girls", meaning: "Malala is known for her activism in girls' education." },
  12: { value: ["pakistan", "mingora"], label: "Mingora, Pakistan", meaning: "Malala was born in Mingora, Pakistan." },
  13: { value: "A", label: "Led the Māori Land March", meaning: "Dame Whina Cooper led the 1975 Māori Land March." },
  14: { value: ["new zealand", "northland, nz"], label: "New Zealand or Northland", meaning: "She came from Northland, New Zealand." },
};

const commonWrongPhrases = ["GIT GUD", "Skill Issue", "Wrong"];
const rareWrongPhrases = ["Bruh you're not skibidi", "Get more rizz", "NEGATIVE AURA", "Be more sigma next time", "You have not played these games before..."];

let score = 0;
let answeredQuestions = 0;
const answeredQuestionsTracker = new Set();
let playerName = "";

function getRandomWrongMessage() {
  return Math.random() < 0.15
    ? rareWrongPhrases[Math.floor(Math.random() * rareWrongPhrases.length)]
    : commonWrongPhrases[Math.floor(Math.random() * commonWrongPhrases.length)];
}

function updateScore(isCorrect, qNum) {
  if (isCorrect) score++;
  answeredQuestions++;
  answeredQuestionsTracker.add(qNum);

  document.getElementById('score').textContent = `Score: ${score}/14`;

  if (answeredQuestions === 14) {
    const finalFeedback = document.getElementById('final-feedback');
    if (score === 14) {
      finalFeedback.textContent = "Good job. Humanity will live to see another day.";
      finalFeedback.className = "feedback correct";
    } else {
      finalFeedback.textContent = "You did so bad that we are now going to bomb humanity. Good luck.";
      finalFeedback.className = "feedback incorrect";
      startCountdown();
    }
    finalFeedback.style.display = "block";

    const nameBox = document.getElementById("player-name-display");
    nameBox.textContent = `Quiz completed by: ${playerName || "Anonymous"}`;
    nameBox.style.display = "block";
  }
}

function checkRadio(qNum) {
  if (answeredQuestionsTracker.has(qNum)) return alert("You've already answered this question!");
  const picked = document.querySelector(`input[name="q${qNum}"]:checked`);
  const feedbackBox = document.getElementById(`feedback${qNum}`);
  if (!picked) return alert("Oops! Pick something before checking.");
  const answer = answers[qNum];

  if (picked.value === answer.value) {
    feedbackBox.innerHTML = `<strong>CORRECT!!</strong> ${answer.meaning}`;
    feedbackBox.className = "feedback correct";
    updateScore(true, qNum);
  } else {
    const msg = getRandomWrongMessage();
    feedbackBox.innerHTML = `<strong>${msg}</strong> Correct answer: ${answer.label}. ${answer.meaning}`;
    feedbackBox.className = "feedback incorrect";
    updateScore(false, qNum);
  }
  feedbackBox.style.display = "block";

  document.querySelectorAll(`input[name="q${qNum}"]`).forEach(radio => radio.disabled = true);
}

function checkDropdown(qNum) {
  if (answeredQuestionsTracker.has(qNum)) return alert("You've already answered this question!");
  const selectBox = document.getElementById(`q${qNum}`);
  const selected = selectBox.value;
  const feedbackBox = document.getElementById(`feedback${qNum}`);

  if (!selected) return alert("Oops! Choose an option before checking.");

  const answer = answers[qNum];
  if (selected === answer.value) {
    feedbackBox.innerHTML = `<strong>CORRECT!!!</strong> ${answer.meaning}`;
    feedbackBox.className = "feedback correct";
    updateScore(true, qNum);
  } else {
    const msg = getRandomWrongMessage();
    feedbackBox.innerHTML = `<strong>${msg}</strong> Correct answer: ${answer.label}. ${answer.meaning}`;
    feedbackBox.className = "feedback incorrect";
    updateScore(false, qNum);
  }
  feedbackBox.style.display = "block";

  selectBox.disabled = true;
}

function checkInput(qNum) {
  if (answeredQuestionsTracker.has(qNum)) return alert("You've already answered this question!");
  const inputBox = document.getElementById(`q${qNum}`);
  const userAnswer = inputBox.value.trim().toLowerCase();
  const feedbackBox = document.getElementById(`feedback${qNum}`);
  if (!userAnswer) return alert("Please type an answer before submitting.");

  const answer = answers[qNum];
  let isCorrect = false;

  if (Array.isArray(answer.value)) {
    isCorrect = answer.value.some(correctVal => userAnswer.includes(correctVal.toLowerCase()));
  } else {
    isCorrect = userAnswer === answer.value.toLowerCase();
  }

  if (isCorrect) {
    feedbackBox.innerHTML = `<strong>CORRECT!!</strong> ${answer.meaning}`;
    feedbackBox.className = "feedback correct";
    updateScore(true, qNum);
  } else {
    const msg = getRandomWrongMessage();
    feedbackBox.innerHTML = `<strong>${msg}</strong> Correct answer: ${answer.label}. ${answer.meaning}`;
    feedbackBox.className = "feedback incorrect";
    updateScore(false, qNum);
  }
  feedbackBox.style.display = "block";

  inputBox.disabled = true;
  document.getElementById(`submit${qNum}`).disabled = true;
}

function submitName() {
  const input = document.getElementById("q0");
  const feedback = document.getElementById("feedback0");
  const submitBtn = document.getElementById("submit0");
  const name = input.value.trim();

  if (!name) {
    alert("Please enter your name.");
    return;
  }

  playerName = name;
  feedback.textContent = `Thanks, ${playerName}! Good luck with the quiz.`;
  feedback.className = "feedback correct";
  feedback.style.display = "block";
  input.disabled = true;
  submitBtn.disabled = true;
}

function startCountdown() {
  let countdown = 5;
  const countdownElem = document.getElementById("countdown");
  countdownElem.textContent = `Countdown to destruction: ${countdown} seconds`;
  const interval = setInterval(() => {
    countdown--;
    countdownElem.textContent = `Countdown to destruction: ${countdown} seconds`;
    if (countdown <= 0) {
      clearInterval(interval);
      countdownElem.textContent = "Kablammo";
    }
  }, 1000);
}
