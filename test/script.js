// 로컬스토리지 데이터 키
const STORAGE_KEY = 'quizzes';

// 퀴즈 데이터를 로컬스토리지에서 가져오기
function getQuizzes() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// 퀴즈 데이터를 로컬스토리지에 저장하기
function saveQuizzes(quizzes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
}

// 퀴즈 생성 함수
function createQuiz(quiz) {
  const quizzes = getQuizzes();
  quizzes.push(quiz);
  saveQuizzes(quizzes);
}

// 퀴즈 삭제 함수
function deleteQuiz(index) {
  const quizzes = getQuizzes();
  quizzes.splice(index, 1);
  saveQuizzes(quizzes);
}

// 퀴즈 수정 함수
function updateQuiz(index, updatedQuiz) {
  const quizzes = getQuizzes();
  quizzes[index] = updatedQuiz;
  saveQuizzes(quizzes);
}

// 특정 퀴즈 가져오기
function getQuiz(index) {
  const quizzes = getQuizzes();
  return quizzes[index];
}

// 퀴즈 목록 렌더링
function renderQuizList(containerId) {
  const quizzes = getQuizzes();
  const container = document.getElementById(containerId);
  container.innerHTML = ''; // 기존 내용을 초기화

  quizzes.forEach((quiz, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${quiz.question}</h3>
      <button onclick="startQuiz(${index})">퀴즈 풀기</button>
      <button onclick="editQuiz(${index})">수정</button>
      <button onclick="deleteQuiz(${index}); renderQuizList('${containerId}')">삭제</button>
    `;
    container.appendChild(div);
  });
}

// 퀴즈 시작
function startQuiz(index) {
  const quiz = getQuiz(index);
  localStorage.setItem('currentQuiz', JSON.stringify({ ...quiz, index }));
  window.location.href = 'quizPage.html';
}

// 퀴즈 수정 페이지 이동
function editQuiz(index) {
  localStorage.setItem('editQuizIndex', index);
  window.location.href = 'quizEditPage.html';
}

// 퀴즈 풀기 기능
function renderQuizPage() {
  const currentQuiz = JSON.parse(localStorage.getItem('currentQuiz'));
  if (!currentQuiz) {
    alert('퀴즈가 없습니다!');
    window.location.href = 'quizListPage.html';
    return;
  }

  document.getElementById('question').textContent = currentQuiz.question;
  const optionsContainer = document.getElementById('options');

  currentQuiz.answers.forEach((answer, idx) => {
    const label = document.createElement('label');
    label.innerHTML = `
      <input type="radio" name="answer" value="${idx + 1}"> ${answer}
    `;
    optionsContainer.appendChild(label);
  });
}

// 퀴즈 정답 제출
function submitQuizAnswer() {
  const currentQuiz = JSON.parse(localStorage.getItem('currentQuiz'));
  const selectedOption = document.querySelector('input[name="answer"]:checked');

  if (!selectedOption) {
    alert('정답을 선택해주세요!');
    return;
  }

  if (parseInt(selectedOption.value) === currentQuiz.correctAnswer) {
    alert('정답입니다!');
    window.location.href = 'quizListPage.html';
  } else {
    alert('틀렸습니다. 다시 도전해보세요!');
    window.location.href = 'retryPage.html';
  }
}

// 퀴즈 수정 페이지 렌더링
function renderEditQuizPage() {
  const index = parseInt(localStorage.getItem('editQuizIndex'), 10);
  const quiz = getQuiz(index);

  if (!quiz) {
    alert('수정할 퀴즈가 없습니다.');
    window.location.href = 'quizListPage.html';
    return;
  }

  document.getElementById('question').value = quiz.question;
  quiz.answers.forEach((answer, idx) => {
    document.getElementById(`answer${idx + 1}`).value = answer;
  });
  document.getElementById('correctAnswer').value = quiz.correctAnswer;
}

// 퀴즈 수정 저장
function saveEditedQuiz() {
  const index = parseInt(localStorage.getItem('editQuizIndex'), 10);

  const updatedQuiz = {
    question: document.getElementById('question').value,
    answers: [
      document.getElementById('answer1').value,
      document.getElementById('answer2').value,
      document.getElementById('answer3').value,
      document.getElementById('answer4').value,
      document.getElementById('answer5').value
    ],
    correctAnswer: parseInt(document.getElementById('correctAnswer').value, 10)
  };

  updateQuiz(index, updatedQuiz);
  alert('퀴즈가 수정되었습니다.');
  window.location.href = 'quizListPage.html';
}
