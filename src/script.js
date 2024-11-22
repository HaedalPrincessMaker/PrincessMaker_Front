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

// 퀴즈 목록 데이터
let quizzes = [];

// 페이지 전환 함수
function showQuizList() {
  quizListContainer.style.display = 'block';
  quizFormContainer.style.display = 'none';
  quizPageContainer.style.display = 'none';
}

function showQuizForm() {
  quizListContainer.style.display = 'none';
  quizFormContainer.style.display = 'block';
  quizPageContainer.style.display = 'none';
}

function showQuizPage() {
  quizListContainer.style.display = 'none';
  quizFormContainer.style.display = 'none';
  quizPageContainer.style.display = 'block';
}

// "새 퀴즈 추가" 버튼 이벤트
addQuizPageBtn.addEventListener('click', showQuizForm);

// "취소" 버튼 이벤트
cancelQuizBtn.addEventListener('click', showQuizList);

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
    document.getElementById('option5Input').value.trim()
  ];

  const correctAnswer = document.querySelector('input[name="correctAnswer"]:checked').value;

  // 새로운 퀴즈 객체 생성
  const newQuiz = {
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
    listItem.textContent = quiz.question;  // 퀴즈 이름 대신 질문을 사용
    // 클릭 시 퀴즈 풀기 페이지로 이동
    listItem.addEventListener('click', () => {
      showQuizPage();
      loadQuizForSolving(index);
    });
    quizList.appendChild(listItem);
  });
}

function loadQuizForSolving(index) {
  const quiz = quizzes[index];
  
  // 퀴즈 제목 (질문) 설정
  quizTitle.textContent = quiz.question;
  
  // 선택지 동적 생성
  quizOptions.innerHTML = '';
  quiz.options.forEach((option, idx) => {
    const optionLabel = document.createElement('label');
    optionLabel.innerHTML = `
      <input type="radio" name="answer" value="${idx + 1}"> ${idx + 1}. ${option}
    `;
    quizOptions.appendChild(optionLabel);
    quizOptions.appendChild(document.createElement('br'));
  });

  // 제출 버튼 클릭 시 답안 처리
  submitQuizBtn.onclick = () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (!selectedAnswer) {
      alert("정답을 선택해주세요!");
      return;
    }

    if (selectedAnswer.value === quiz.correctAnswer) {
      alert("정답입니다! 축하합니다!");
    } else {
      alert("오답입니다! 다시 시도해보세요.");
    }
  };
}
