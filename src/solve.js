const quizContainer = document.getElementById('quizContainer');
const resultContainer = document.getElementById('resultContainer');
const checkAnswersBtn = document.getElementById('checkAnswersBtn');

// 로컬 저장소에서 현재 퀴즈 ID 가져오기
const currentQuizId = localStorage.getItem('selectedQuizId');

// 퀴즈 로딩
async function loadQuiz() {
  try {
    // 서버에서 퀴즈 ID에 맞는 퀴즈 데이터를 가져오기
    const response = await fetch(`/quiz/${currentQuizId}`);

    if (!response.ok) {
      throw new Error('퀴즈 데이터를 불러올 수 없습니다.');
    }

    const quiz = await response.json();

    // 데이터 유효성 확인
    if (!quiz || !quiz.question || !quiz.options) {
      quizContainer.innerHTML = '<p>퀴즈 데이터를 불러올 수 없습니다.</p>';
      checkAnswersBtn.disabled = true;
      return;
    }

    // 퀴즈 데이터 설정
    currentQuiz = quiz; // 가져온 퀴즈 데이터를 전역 변수로 저장
    quizContainer.innerHTML = ''; // 초기화
    resultContainer.textContent = '';

    // 질문 표시
    const quizQuestion = document.createElement('h3');
    quizQuestion.textContent = quiz.question;
    quizContainer.appendChild(quizQuestion);

    // 선택지 표시
    quiz.options.forEach((option, index) => {
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
  } catch (error) {
    quizContainer.innerHTML = `<p>${error.message}</p>`;
    console.error(error);
  }
}

// 정답 체크
checkAnswersBtn.addEventListener('click', async () => {
  const selectedOption = document.querySelector('input[name="quizOption"]:checked');

  if (!selectedOption) {
    resultContainer.textContent = '선택지를 선택해주세요!';
    return;
  }

  try {
    // 사용자가 선택한 답안
    const userAnswer = parseInt(selectedOption.value, 10);

    // API 호출로 정답 제출
    const response = await fetch(`/quiz/${currentQuizId}/attempt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer: userAnswer }),
    });

    if (!response.ok) {
      throw new Error('정답 제출 중 오류가 발생했습니다.');
    }

    const result = await response.json();

    // 결과 표시
    resultContainer.textContent = result.correct
      ? '정답입니다!'
      : '틀렸습니다. 다시 시도해 보세요.';

    // 결과를 로컬스토리지에 저장 (사용자 답변과 결과)
    const quizResult = {
      quizId: currentQuizId,
      userAnswer,
      correct: result.correct,
    };
    localStorage.setItem('quizResult', JSON.stringify(quizResult));

  } catch (error) {
    resultContainer.textContent = '오류가 발생했습니다. 다시 시도해주세요.';
    console.error(error);
  }
});

// 퀴즈 로딩 실행
loadQuiz();
