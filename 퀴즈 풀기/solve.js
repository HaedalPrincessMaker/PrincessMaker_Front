// script.js

const quizListContainer = document.getElementById('quizListContainer');
const quizFormContainer = document.getElementById('quizFormContainer');
const addQuizPageBtn = document.getElementById('addQuizPageBtn');
const cancelQuizBtn = document.getElementById('cancelQuizBtn');
const quizForm = document.getElementById('quizForm');
const quizList = document.getElementById('quizList');

// 퀴즈 목록 데이터
let quizzes = [];

// 페이지 전환 함수
function showQuizList() {
  quizListContainer.style.display = 'block';
  quizFormContainer.style.display = 'none';
}

function showQuizForm() {
  quizListContainer.style.display = 'none';
  quizFormContainer.style.display = 'block';
}

// "새 퀴즈 추가" 버튼 이벤트
addQuizPageBtn.addEventListener('click', showQuizForm);

// "취소" 버튼 이벤트
cancelQuizBtn.addEventListener('click', showQuizList);

// 퀴즈 저장 이벤트
quizForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // 입력값 가져오기
  const quizName = document.getElementById('quizName').value.trim();
  const quizQuestion = document.getElementById('quizQuestion').value.trim();
  const options = [
    document.getElementById('option1Input').value.trim(),
    document.getElementById('option2Input').value.trim(),
    document.getElementById('option3Input').value.trim(),
    document.getElementById('option4Input').value.trim(),
    document.getElementById('option5Input').value.trim()
  ];

  const correctAnswer = document.querySelector('input[name="correctAnswer"]:checked').value;

  // 새로운 퀴즈 객체 생성
  const newQuiz = {
    name: quizName,
    question: quizQuestion,
    options: options,
    correctAnswer: correctAnswer
  };

  // 퀴즈 목록에 추가
  quizzes.push(newQuiz);

  // 퀴즈 목록 업데이트
  updateQuizList();

  // 폼 초기화 후 목록 페이지로 돌아가기
  quizForm.reset();
  showQuizList();
});

function updateQuizList() {
  quizList.innerHTML = '';
  quizzes.forEach((quiz, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = quiz.name;
    quizList.appendChild(listItem);
  });
}
