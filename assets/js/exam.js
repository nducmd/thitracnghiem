// ============================= TEST================================
var questions = {
    question1: {
        questionText: "Câu hỏi đúng/sai: Thủ đô của Việt Nam là Hà Nội?",
        correctAnswer: "Đúng",
    },
    question2: {
        questionText: "Câu hỏi lựa chọn: Đâu là thành phố lớn của Việt Nam?",
        correctAnswer: "B",
    },
    question3: {
        questionText: "Câu hỏi nhiều lựa chọn: Chọn các quốc gia ở châu Á:",
        correctAnswers: ["B", "C"],
    },
    question4: {
        questionText: "Câu hỏi tự luận: Viết tên một quốc gia ở châu Á?",
        correctAnswer: "Châu Á",
    },
};

function checkTrueFalseAnswer(questionId, correctAnswer) {
    var selectedAnswer = document.querySelector(
        'input[name="answer' + questionId.slice(-1) + '"]:checked'
    );
    var resultDiv = document.getElementById("result" + questionId.slice(-1));

    if (selectedAnswer && selectedAnswer.value === correctAnswer) {
        resultDiv.textContent = "Kết quả: Đúng";
        resultDiv.style.color = "green";
        return 1;
    } else {
        resultDiv.textContent = "Đáp án đúng là: " + correctAnswer;
        resultDiv.style.color = "red";
        return 0;
    }
}

function checkAnswer(questionId, correctAnswer) {
    var selectedAnswer = document.querySelector(
        'input[name="answer' + questionId.slice(-1) + '"]:checked'
    );
    var resultDiv = document.getElementById("result" + questionId.slice(-1));

    if (selectedAnswer && selectedAnswer.value === correctAnswer) {
        resultDiv.textContent = "Kết quả: Đúng";
        resultDiv.style.color = "green";
        return 1;
    } else {
        resultDiv.textContent = "Đáp án đúng là: " + correctAnswer;
        resultDiv.style.color = "red";
        return 0;
    }
}

function checkMultipleChoiceAnswer(questionId, correctAnswers) {
    var selectedAnswers = document.querySelectorAll(
        'input[name="answer' + questionId.slice(-1) + '"]:checked'
    );
    var resultDiv = document.getElementById("result" + questionId.slice(-1));
    var isAllCorrect = true;

    if (selectedAnswers.length === 0) {
        resultDiv.textContent = "Vui lòng chọn ít nhất một phương án.";
        resultDiv.style.color = "red";
        return 0;
    }

    var selectedValues = Array.from(selectedAnswers).map(
        (answer) => answer.value
    );
    var incorrectAnswers = selectedValues.filter(
        (value) => !correctAnswers.includes(value)
    );

    if (incorrectAnswers.length === 0) {
        resultDiv.textContent = "Kết quả: Đúng";
        resultDiv.style.color = "green";
        return 1;
    } else {
        resultDiv.textContent = "Đáp án đúng là: " + correctAnswers.join(", ");
        resultDiv.style.color = "red";
        return 0;
    }
}

function checkEssayAnswer(questionId, correctAnswer) {
    var essayAnswer = document
        .getElementById("essayAnswer")
        .value.toLowerCase();
    var resultDiv = document.getElementById("result" + questionId.slice(-1));

    if (essayAnswer.includes(correctAnswer)) {
        resultDiv.textContent = "Kết quả: Đúng";
        resultDiv.style.color = "green";
        return 1;
    } else {
        resultDiv.textContent = "Đáp án đúng là: " + correctAnswer;
        resultDiv.style.color = "red";
        return 0;
    }
}

function submitAnswers() {
    var score = 0;
    Object.keys(questions).forEach(function (questionId) {
        var question = questions[questionId];
        if (question.hasOwnProperty("correctAnswer")) {
            score += checkTrueFalseAnswer(questionId, question.correctAnswer);
        } else if (question.hasOwnProperty("correctAnswers")) {
            score += checkMultipleChoiceAnswer(
                questionId,
                question.correctAnswers
            );
        } else if (question.hasOwnProperty("correctAnswer")) {
            score += checkEssayAnswer(questionId, question.correctAnswer);
        }
    });

    var totalScoreDiv = document.getElementById("totalScore");
    totalScoreDiv.textContent =
        "Tổng điểm: " + score + "/" + Object.keys(questions).length;
}

var startTime = new Date();
var totalTime = 70; 

function updateRemainingTime() {
    var currentTime = new Date();
    var elapsedTime = (currentTime - startTime) / 1000;
    var remainingTime = totalTime * 60 - elapsedTime;

    var minutes = Math.floor(remainingTime / 60);
    var seconds = Math.floor(remainingTime % 60);
    document.querySelector("#remain-time").textContent =
        minutes + " phút " + seconds + "s";


    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        document.querySelector("#totalTime").textContent =
            "Hết thời gian làm bài!";
      
    }
}


var timerInterval = setInterval(updateRemainingTime, 1000);


function submitAnswers() {
    var score = 0;
    Object.keys(questions).forEach(function (questionId) {
        var question = questions[questionId];
        if (question.hasOwnProperty("correctAnswer")) {
            score += checkTrueFalseAnswer(questionId, question.correctAnswer);
        } else if (question.hasOwnProperty("correctAnswers")) {
            score += checkMultipleChoiceAnswer(
                questionId,
                question.correctAnswers
            );
        } else if (question.hasOwnProperty("correctAnswer")) {
            score += checkEssayAnswer(questionId, question.correctAnswer);
        }
    });

    var totalScoreDiv = document.getElementById("totalScore");
    totalScoreDiv.textContent =
        "Tổng điểm: " + score + "/" + Object.keys(questions).length;

    clearInterval(timerInterval);
    var currentTime = new Date();
    var elapsedTime = (currentTime - startTime) / 1000; 
    var minutes = Math.floor(elapsedTime / 60);
    var seconds = Math.floor(elapsedTime % 60);
    document.querySelector("#totalTime").textContent =
        "Thời gian đã làm bài: " + minutes + " phút " + seconds + "s";
}

function selectQuestion(questionId) {
    // document.querySelectorAll(".answerBox").forEach(function (box) {
    //     box.style.backgroundColor = "#fff";
    // });

    var reviewBox = document.getElementById("rvans" + questionId.slice(-1));
    reviewBox.style.backgroundColor = "#e17b75";
}
document.querySelectorAll(".question").forEach(function (question) {
    question.addEventListener("click", function () {
        var questionId = this.id;
        selectQuestion(questionId);
    });
});
