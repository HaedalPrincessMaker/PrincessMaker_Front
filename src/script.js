// DOM 요소 가져오기
const quizListContainer = document.getElementById('quizListContainer');
const quizFormContainer = document.getElementById('quizFormContainer');
const addQuizPageBtn = document.getElementById('addQuizPageBtn');
const cancelQuizBtn = document.getElementById('cancelQuizBtn');
const quizForm = document.getElementById('quizForm');
const quizList = document.getElementById('quizList');
const quizPageContainer = document.getElementById('quizPageContainer');
const quizTitle = document.getElementById('quizTitle');
const quizOptions = document.getElementById('quizOptions');
const submitQuizBtn = document.getElementById('submitQuizBtn');

// 퀴즈 데이터 저장 (로컬스토리지에서 불러오기)
let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

// 페이지 전환 함수
function switchPage(page) {
  // 모든 페이지를 숨기고 필요한 페이지만 표시
  const pages = {
    list: quizListContainer,
    form: quizFormContainer,
    quiz: quizPageContainer,
  };

  Object.values(pages).forEach((container) => {
    container.style.display = 'none';
  });

  if (pages[page]) {
    pages[page].style.display = 'block';
  }
}

// "새 퀴즈 추가" 버튼 이벤트
addQuizPageBtn.addEventListener('click', () => switchPage('form'));

// "취소" 버튼 이벤트
cancelQuizBtn.addEventListener('click', () => switchPage('list'));

// 퀴즈 저장 이벤트
quizForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // 입력값 가져오기
  const quizQuestion = document.getElementById('quizQuestion').value.trim();
  const options = [
    document.getElementById('option1Input').value.trim(),
    document.getElementById('option2Input').value.trim(),
    document.getElementById('option3Input').value.trim(),
    document.getElementById('option4Input').value.trim(),
    document.getElementById('option5Input').value.trim(),
  ];

  const correctAnswer = document.querySelector('input[name="correctAnswer"]:checked')?.value;

  // 유효성 검사
  if (!quizQuestion || options.some((opt) => !opt) || !correctAnswer) {
    alert("모든 필드를 정확히 입력해주세요.");
    return;
  }

  // 새로운 퀴즈 객체 생성 및 추가
  quizzes.push({ question: quizQuestion, options, correctAnswer });

  // 로컬스토리지에 퀴즈 데이터 저장
  localStorage.setItem('quizzes', JSON.stringify(quizzes));

  // 퀴즈 목록 업데이트
  updateQuizList();

  // 폼 초기화 후 목록 페이지로 이동
  quizForm.reset();
  switchPage('list');
});

// 퀴즈 목록 업데이트
function updateQuizList() {
  quizList.innerHTML = '';
  quizzes.forEach((quiz, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = quiz.question; // 질문 표시
    listItem.classList.add('quiz-item'); // 스타일링을 위한 클래스 추가

    // 클릭 시 퀴즈 풀이 페이지로 이동
    listItem.addEventListener('click', () => loadQuizForSolving(index));
    quizList.appendChild(listItem);
  });
}

// 퀴즈 풀이 페이지 로드
function loadQuizForSolving(index) {
  const quiz = quizzes[index];

  // 퀴즈 제목 및 선택지 설정
  quizTitle.textContent = quiz.question;
  quizOptions.innerHTML = '';
  quiz.options.forEach((option, idx) => {
    const optionLabel = document.createElement('label');
    optionLabel.innerHTML = ` 
      <input type="radio" name="answer" value="${idx + 1}"> ${idx + 1}. ${option}
    `;
    quizOptions.appendChild(optionLabel);
    quizOptions.appendChild(document.createElement('br'));
  });

  // 제출 버튼 클릭 이벤트 설정
  submitQuizBtn.onclick = () => submitQuizAnswer(index);
  switchPage('quiz');
}

// 퀴즈 정답 확인
function submitQuizAnswer(index) {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (!selectedAnswer) {
    alert("정답을 선택해주세요!");
    return;
  }

  const quiz = quizzes[index];
  if (selectedAnswer.value === quiz.correctAnswer) {
    alert("정답입니다! 축하합니다!");
    switchPage('list');
  } else {
    alert("오답입니다! 다시 시도해보세요.");
  }
}

// 초기화 시 퀴즈 목록 페이지 표시
switchPage('list');
updateQuizList();
