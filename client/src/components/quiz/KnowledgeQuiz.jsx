import { useState } from "react";
import {useScore} from "../../context/ScoreContext";
import { set } from "mongoose";

const KnowledgeQuiz = ({ goBack }) => {
  const { updateStats } = useScore();
  const questions = [
    {
      question: "What is phishing?",
      options: [
        "A secure communication protocol",
        "A cyberattack that tricks users into revealing sensitive information",
        "A type of malware scanner"
      ],
      correct: 1,
      explanation:
        "Phishing is a social engineering attack where attackers trick users into giving up sensitive information like passwords or credit card details."
    },
    {
      question: "Which of the following is a common phishing sign?",
      options: [
        "Emails addressed to you by full name",
        "Urgent messages demanding immediate action",
        "Messages sent only through secure portals"
      ],
      correct: 1,
      explanation:
        "Phishing messages often create urgency to pressure victims into acting without thinking."
    },
    {
      question: "What is the safest action when receiving a suspicious email?",
      options: [
        "Click the link to verify the sender",
        "Reply to ask if it is legitimate",
        "Report it and delete the email"
      ],
      correct: 2,
      explanation:
        "You should never interact with suspicious emails. Report them through official channels and delete them."
    }
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (index) => {
    if (showFeedback) return;

    setSelected(index);
    setShowFeedback(true);

    if (index === questions[current].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (current === questions.length - 1) {
      handleFinishQuiz();
    }else{
      setSelected(null);
      setShowFeedback(false);
      setCurrent((prev) => prev + 1);
    }
  };

  const restartQuiz = () => {
    setCurrent(0);
    setSelected(null);
    setShowFeedback(false);
    setScore(0);
  };  

  const handleFinishQuiz = () => {
    const finalPercentage = (score / questions.length) * 100;
    updateStats(finalPercentage, "knowledge");
    setCurrent(current+1);
  }

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="quiz-card">
      <button className="back-btn" onClick={goBack}>
        ← Back
      </button>

      {current < questions.length ? (
        <>
          {/* Progress */}
          <div className="quiz-progress-wrapper">
            <div
              className="quiz-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="question-count">
            Question {current + 1} of {questions.length}
          </p>

          <h2>{questions[current].question}</h2>

          <div className="options">
            {questions[current].options.map((option, index) => {
              let className = "option-btn";

              if (showFeedback) {
                if (index === questions[current].correct) {
                  className += " correct";
                } else if (index === selected) {
                  className += " wrong";
                }
              }

              return (
                <button
                  key={index}
                  className={className}
                  onClick={() => handleOptionClick(index)}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="feedback">
              <p>{questions[current].explanation}</p>
              <button className="next-btn" onClick={nextQuestion}>
                {current === questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question →"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="quiz-result">
          <h2>Quiz Completed 🎉</h2>
          <p>
            You scored <strong>{score}</strong> out of{" "}
            <strong>{questions.length}</strong>
          </p>

          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default KnowledgeQuiz;
