var questions = {
    question1: {
        questionText:
            "Câu hỏi đúng/sai: HTTP là từ viết tắt của: HyperText Transmision Protocol ?",
        correctAnswer: "B",
    },
    question2: {
        questionText:
            "Câu hỏi lựa chọn: Thứ tự của các tầng trong mô hình tham chiếu OSI?",
        correctAnswer: "A",
    },
    question3: {
        questionText:
            "Câu hỏi nhiều lựa chọn: Ứng dụng nào sử dụng mô hình client/server?",
        correctAnswers: ["A", "D"],
    },
    question4: {
        questionText:
            "Câu hỏi tự luận: Mã trạng thái nào của HTTP có ý nghĩa là OK ?",
        correctEssayAnswer: "200",
    },
};

var startTime = new Date();
var totalTime = 60;
var timerInterval;

function checkTrueFalseAnswer(questionId, correctAnswer) {
    var selectedAnswer = document.querySelector(
        'input[name="answer' + questionId.slice(-1) + '"]:checked'
    );
    var resultDiv = document.getElementById("result" + questionId.slice(-1));

    if (selectedAnswer && selectedAnswer.value === correctAnswer) {
        resultDiv.textContent = "Kết quả chính xác";
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

    if (
        incorrectAnswers.length === 0 &&
        selectedValues.length === correctAnswers.length
    ) {
        resultDiv.textContent = "Kết quả chính xác";
        resultDiv.style.color = "green";
        return 1;
    } else {
        resultDiv.textContent = "Đáp án đúng là: " + correctAnswers.join(", ");
        resultDiv.style.color = "red";
        return 0;
    }
}

function checkEssayAnswer(questionId, correctEssayAnswer) {
    var essayAnswer = document
        .getElementById("essayAnswer")
        .value.toLowerCase();
    var resultDiv = document.getElementById("result" + questionId.slice(-1));

    if (essayAnswer.includes(correctEssayAnswer)) {
        resultDiv.textContent = "Kết quả chính xác";
        resultDiv.style.marginTop = "15px"
        resultDiv.style.color = "green";
        return 1;
    } else {
        resultDiv.textContent = "Đáp án đúng là: " + correctEssayAnswer;
        resultDiv.style.marginTop = "15px"
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
        } else if (question.hasOwnProperty("correctEssayAnswer")) {
            score += checkEssayAnswer(questionId, question.correctEssayAnswer);
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
    var reviewBox = document.getElementById("rvans" + questionId.slice(-1));
    reviewBox.style.backgroundColor = "#e17b75";
}

document.querySelectorAll(".question").forEach(function (question) {
    question.addEventListener("click", function () {
        var questionId = this.id;
        selectQuestion(questionId);
    });
});

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

timerInterval = setInterval(updateRemainingTime, 1000);
