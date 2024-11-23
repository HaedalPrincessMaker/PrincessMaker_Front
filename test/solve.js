const quizContainer = document.getElementById('quizContainer');
const resultContainer = document.getElementById('resultContainer');
const checkAnswersBtn = document.getElementById('checkAnswersBtn');

// 로컬 저장소에서 현재 퀴즈 가져오기
const currentQuiz = JSON.parse(localStorage.getItem('currentQuiz'));

// 퀴즈 로딩
function loadQuiz() {
  const quizQuestion = document.createElement('h3');
  quizQuestion.textContent = currentQuiz.question;
  quizContainer.appendChild(quizQuestion);

  currentQuiz.options.forEach((option, index) => {
    const optionContainer = document.createElement('div');
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'quizOption';
    radioInput.value = index + 1;

    const label = document.createElement('label');
    label.textContent = ` ${option}`;

    optionContainer.appendChild(radioInput);
    optionContainer.appendChild(label);

    quizContainer.appendChild(optionContainer);
  });
}

// 정답 체크
checkAnswersBtn.addEventListener('click', () => {
  const selectedOption = document.querySelector('input[name="quizOption"]:checked');
  if (selectedOption) {
    const userAnswer = selectedOption.value;
    const correctAnswer = currentQuiz.correctAnswer;

    const resultMessage = userAnswer === correctAnswer
      ? '정답입니다!'
      : '틀렸습니다. 다시 시도해 보세요.';

    resultContainer.textContent = resultMessage;
  } else {
    resultContainer.textContent = '선택지를 선택해주세요!';
  }
});

// 퀴즈 로딩 실행
loadQuiz();
