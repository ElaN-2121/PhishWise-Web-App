import { useState, useEffect } from "react";
import { useScore } from "../../context/ScoreContext";

const RealWorldQuiz = ({ goBack }) => {
  const { updateStats } = useScore();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const API_URL  = "http://localhost:5000";

  // Fetch real-world cases from backend
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/quiz/realworld`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCases(data);
      } catch (err) {
        console.error("Failed to fetch real-world cases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const handleOptionClick = async (index) => {
    if (showFeedback) return;

    setSelected(index);
    setShowFeedback(true);

    // Submit answer to backend
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/quiz/submit`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          questionId: cases[current]._id,
          selectedAnswer: cases[current].options[index],
        }),
      });
      const data = await res.json();
      if (data.correct) setScore((prev) => prev + 1);
    } catch (err) {
      console.error("Failed to submit answer:", err);
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

  const handleFinishQuiz = () => {
    const finalPercentage = (score / cases.length) * 100;
    updateStats(finalPercentage, "realWorld");
    setCurrent(current + 1);
  };

  const restartQuiz = () => {
    setCurrent(0);
    setSelected(null);
    setShowFeedback(false);
    setScore(0);
  };

  if (loading) return <p>Loading real-world cases...</p>;

  if (current >= cases.length)
    return (
      <div className="quiz-result">
        <h2>Cases Completed 🎯</h2>
        <p>
          You correctly identified <strong>{score}</strong> out of <strong>{cases.length}</strong> phishing cases.
        </p>
        <button onClick={restartQuiz}>Retry Cases</button>
      </div>
    );

  const progress = ((current + 1) / cases.length) * 100;
  const c = cases[current];

  return (
    <div className="quiz-card">
      <button className="back-btn" onClick={goBack}>← Back</button>

      <div className="progress-wrapper">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <p className="question-count">
        Case {current + 1} of {cases.length}
      </p>

      <h2>{c.title}</h2>
      <div className="scenario-box">
        <p>{c.scenario}</p>
      </div>

      <h3>What type of phishing is this?</h3>
      <div className="options">
        {c.options.map((option, idx) => {
          let className = "option-btn";
          if (showFeedback) {
            if (option === c.correctAnswer) className += " correct";
            else if (idx === selected) className += " wrong";
          }
          return (
            <button key={idx} className={className} onClick={() => handleOptionClick(idx)}>
              {option}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="feedback">
          <p>{c.explanation}</p>
          <button className="next-btn" onClick={nextCase}>
            {current === cases.length - 1 ? "Finish Cases" : "Next Case →"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RealWorldQuiz;
