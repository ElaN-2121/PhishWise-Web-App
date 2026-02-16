import { useState } from "react";
import {useScore} from "../../context/ScoreContext";

const RealWorldQuiz = ({ goBack }) => {
  const cases = [
    {
      title: "COVID-19 WHO Scam (2020)",
      scenario:
        "You receive an email claiming to be from the World Health Organization. It urges you to download a document with important COVID-19 safety guidelines.",
      options: ["Spear phishing", "Email phishing", "Clone phishing"],
      correct: 1,
      explanation:
        "Attackers widely sent fake WHO emails during the COVID-19 pandemic. This is a classic example of mass email phishing.",
    },
    {
      title: "CEO Fraud Attack",
      scenario:
        "An employee receives an email that appears to come from the company CEO asking for an urgent wire transfer.",
      options: ["Smishing", "Spear phishing", "Vishing"],
      correct: 1,
      explanation:
        "This attack targets a specific individual and impersonates a trusted authority, making it spear phishing.",
    },
    {
      title: "Bank SMS Alert",
      scenario:
        "You receive an SMS saying your bank account has been locked and asks you to click a link to restore access.",
      options: ["Smishing", "Vishing", "Clone phishing"],
      correct: 0,
      explanation:
        "Phishing conducted through SMS messages is known as smishing.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (index) => {
    if (showFeedback) return;

    setSelected(index);
    setShowFeedback(true);

    if (index === cases[current].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextCase = () => {
    if (current === cases.length - 1) {
      handleFinishQuiz();
    } else {
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

  const { updateStats } = useScore();
  const handleFinishQuiz = () => {
    const finalPercentage = (score / cases.length) * 100;
    updateStats(finalPercentage, "realWorld");
    setCurrent(current + 1);
  }

  const progress = ((current + 1) / cases.length) * 100;

  return (
    <div className="quiz-card">
      <button className="back-btn" onClick={goBack}>
        ← Back
      </button>

      {current < cases.length ? (
        <>
          {/* Progress */}
          <div className="progress-wrapper">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>

          <p className="question-count">
            Case {current + 1} of {cases.length}
          </p>

          <h2>{cases[current].title}</h2>

          <div className="scenario-box">
            <p>{cases[current].scenario}</p>
          </div>

          <h3>What type of phishing is this?</h3>

          <div className="options">
            {cases[current].options.map((option, index) => {
              let className = "option-btn";

              if (showFeedback) {
                if (index === cases[current].correct) {
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
              <p>{cases[current].explanation}</p>
              <button className="next-btn" onClick={nextCase}>
                {current === cases.length - 1 ? "Finish Cases" : "Next Case →"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="quiz-result">
          <h2>Cases Completed 🎯</h2>
          <p>
            You correctly identified <strong>{score}</strong> out of{" "}
            <strong>{cases.length}</strong> phishing cases.
          </p>

          <button onClick={restartQuiz}>Retry Cases</button>
        </div>
      )}
    </div>
  );
};

export default RealWorldQuiz;
