// 주요 요소 가져오기
const quizListContainer = document.getElementById('quizListContainer');
const quizFormContainer = document.getElementById('quizFormContainer');
const quizPageContainer = document.getElementById('quizPageContainer');
const addQuizPageBtn = document.getElementById('addQuizPageBtn');
const cancelQuizBtn = document.getElementById('cancelQuizBtn');
const quizForm = document.getElementById('quizForm');
const quizList = document.getElementById('quizList');
const submitAnswerBtn = document.getElementById('submitAnswerBtn');
const backToListBtn = document.getElementById('backToListBtn');

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

function showQuizPage(quiz) {
  quizListContainer.style.display = 'none';
  quizFormContainer.style.display = 'none';
  quizPageContainer.style.display = 'block';

  // 퀴즈 문제와 선택지 표시
  const quizQuestionContainer = document.getElementById('quizQuestionContainer');
  const quizOptionsContainer = document.getElementById('quizOptionsContainer');
  quizQuestionContainer.innerHTML = `<h3>${quiz.question}</h3>`;

  quizOptionsContainer.innerHTML = '';
  quiz.options.forEach((option, index) => {
    const optionLabel = document.createElement('label');
    optionLabel.innerHTML = `<input type="radio" name="quizOption" value="${index + 1}"> ${option}`;
    quizOptionsContainer.appendChild(optionLabel);
    quizOptionsContainer.appendChild(document.createElement('br'));
  });

  // 답 제출 버튼 이벤트
  submitAnswerBtn.onclick = () => {
    const selectedOption = document.querySelector('input[name="quizOption"]:checked');
    if (!selectedOption) {
      alert("답을 선택해 주세요!");
      return;
    }

    const answer = selectedOption.value;
    if (answer === quiz.correctAnswer) {
      alert("정답입니다!");
    } else {
      alert("틀렸습니다!");
    }
  };
}

// "새 퀴즈 추가" 버튼 이벤트
addQuizPageBtn.addEventListener('click', showQuizForm);

// "취소" 버튼 이벤트
cancelQuizBtn.addEventListener('click', showQuizList);

// "목록으로 돌아가기" 버튼 이벤트
backToListBtn.addEventListener('click', showQuizList);

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

  // 선택한 정답 체크
  const correctAnswer = document.querySelector('input[name="correctAnswer"]:checked');

  // 필수 입력값 체크
  if (!quizName || !quizQuestion || options.some(option => option === "") || !correctAnswer) {
    alert("모든 필드를 정확히 입력해 주세요.");
    return;
  }

  // 정답 처리
  const correctAnswerValue = correctAnswer.value;

  // 데이터 저장
  const newQuiz = {
    id: quizzes.length + 1,
    name: quizName,
    question: quizQuestion,
    options: options,
    correctAnswer: correctAnswerValue,
  };
  quizzes.push(newQuiz);

  // 퀴즈 목록에 추가
  const quizItem = document.createElement('div');
  quizItem.classList.add('quizItem');

  // 퀴즈 이름 추가
  const quizNameElement = document.createElement('span');
  quizNameElement.textContent = quizName;

  // 삭제 버튼 추가
  const deleteButton = document.createElement('button');
  deleteButton.textContent = "삭제";
  deleteButton.style.marginLeft = '10px';  // 삭제 버튼과 퀴즈 이름 사이 간격 설정
  deleteButton.onclick = () => {
    quizzes = quizzes.filter(q => q.id !== newQuiz.id);
    quizItem.remove();
  };

  // 퀴즈 항목 클릭 시 풀기 페이지로 이동
  quizNameElement.onclick = () => showQuizPage(newQuiz);

  // 삭제 버튼과 퀴즈 이름을 각기 다른 엘리먼트에 배치
  quizItem.appendChild(quizNameElement);
  quizItem.appendChild(deleteButton);
  quizList.appendChild(quizItem);

  // 폼 초기화 및 목록 페이지로 이동
  quizForm.reset();
  showQuizList();
});