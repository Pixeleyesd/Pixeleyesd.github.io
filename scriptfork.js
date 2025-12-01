const selectedOptions = {};  // Tracks selected options per question
let score = 0;  // Tracks the number of correct answers
const answeredQuestionsTracker = new Set();

const answers = {
    1: { value: "C", label: "Restrict current flow", meaning: "Resistors limit current in a circuit." },
    2: { value: "C", label: "It might burn out", meaning: "Without a resistor, the LED could burn out due to excessive current." },
    3: { value: "capacitor", label: "Capacitor", meaning: "Capacitors store electrical energy for short periods." },
    4: { value: "ground", label: "Ground", meaning: "The ⏚ symbol represents ground in circuits." },
    5: { value: "The other bulb stays lit", label: "The other bulb stays lit", meaning: "In parallel circuits, if one bulb fails, the others keep working." }
};

// Function to check radio buttons for Question 1
function checkRadio(qNum) {
    if (answeredQuestionsTracker.has(qNum)) return;
    const picked = document.querySelector(`input[name="q${qNum}"]:checked`);
    const feedbackBox = document.getElementById(`resp${qNum}`);
    if (!picked) {
        alert("Please select an option.");
        return;
    }

    const answer = answers[qNum];
    if (picked.value === answer.value) {
        feedbackBox.innerHTML = `<strong>CORRECT!</strong> ${answer.meaning}`;
        feedbackBox.className = "response correct";
        score++;
    } else {
        feedbackBox.innerHTML = `<strong>Incorrect!</strong> The correct answer is: ${answer.label}. ${answer.meaning}`;
        feedbackBox.className = "response incorrect";
    }

    feedbackBox.style.display = "block";
    answeredQuestionsTracker.add(qNum);
    updateScore();
    disableInputs(qNum);
}

// Function to check dropdown questions (Question 2)
function checkDropdown(qNum) {
    if (answeredQuestionsTracker.has(qNum)) return;
    const selected = document.getElementById(`select-q${qNum}`).value;
    const feedbackBox = document.getElementById(`resp${qNum}`);
    if (!selected) {
        alert("Please select an option.");
        return;
    }

    const answer = answers[qNum];
    if (selected === answer.value) {
        feedbackBox.innerHTML = `<strong>CORRECT!</strong> ${answer.meaning}`;
        feedbackBox.className = "response correct";
        score++;
    } else {
        feedbackBox.innerHTML = `<strong>Incorrect!</strong> The correct answer is: ${answer.label}. ${answer.meaning}`;
        feedbackBox.className = "response incorrect";
    }

    feedbackBox.style.display = "block";
    answeredQuestionsTracker.add(qNum);
    updateScore();
    disableInputs(qNum);
}

// Function to check input/text questions (Question 3 and 4)
function checkInput(qNum) {
    if (answeredQuestionsTracker.has(qNum)) return;
    const inputBox = document.getElementById(`text-q${qNum}`);
    const typedAnswer = inputBox.value.trim().toLowerCase();
    const feedbackBox = document.getElementById(`resp${qNum}`);
    const answer = answers[qNum];

    if (!typedAnswer) return;

    if (typedAnswer === answer.value.toLowerCase()) {
        feedbackBox.innerHTML = `<strong>CORRECT!</strong> ${answer.meaning}`;
        feedbackBox.className = "response correct";
        score++;
    } else {
        feedbackBox.innerHTML = `<strong>Incorrect!</strong> The correct answer is: ${answer.label}. ${answer.meaning}`;
        feedbackBox.className = "response incorrect";
    }

    feedbackBox.style.display = "block";
    answeredQuestionsTracker.add(qNum);
    updateScore();
    disableInputs(qNum);
}

// Function to check button-based answers (Question 5)
function checkBtn(qNum, correctValue) {
    if (answeredQuestionsTracker.has(qNum)) return;
    const clicked = event.target;
    const feedbackBox = document.getElementById(`resp${qNum}`);
    const answer = answers[qNum];

    const userAnswer = clicked.textContent.trim();
    if (userAnswer === answer.value) {
        feedbackBox.innerHTML = `<strong>CORRECT!</strong> ${answer.meaning}`;
        feedbackBox.className = "response correct";
        score++;
    } else {
        feedbackBox.innerHTML = `<strong>Incorrect!</strong> The correct answer is: ${answer.label}. ${answer.meaning}`;
        feedbackBox.className = "response incorrect";
    }

    feedbackBox.style.display = "block";
    answeredQuestionsTracker.add(qNum);
    updateScore();
    disableInputs(qNum);
}

// Disable all inputs after answering a question
function disableInputs(qNum) {
    const inputs = document.querySelectorAll(`.question[data-question="${qNum}"] input, .question[data-question="${qNum}"] button`);
    inputs.forEach(input => input.disabled = true);
}

// Update score display
function updateScore() {
    document.getElementById('total-score').innerText = `Score: ${score} / 5`;
}
