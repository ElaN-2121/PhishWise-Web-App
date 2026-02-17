import { useState, useEffect } from "react";
import { useScore } from "../../context/ScoreContext";

const KnowledgeQuiz = ({ goBack }) => {
  const { updateStats } = useScore();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const API_URL ="http://localhost:5000";

  // Fetch questions from backend on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/quiz/knowledge`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
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
          questionId: questions[current]._id,
          selectedAnswer: questions[current].options[index],
        }),
      });
      const data = await res.json();
      if (data.correct) setScore((prev) => prev + 1);
    } catch (err) {
      console.error("Failed to submit answer:", err);
    }
  };

  const nextQuestion = () => {
    if (current === questions.length - 1) {
      handleFinishQuiz();
    } else {
      setSelected(null);
      setShowFeedback(false);
      setCurrent((prev) => prev + 1);
    }
  };

  const handleFinishQuiz = () => {
    const finalPercentage = (score / questions.length) * 100;
    updateStats(finalPercentage, "knowledge");
    setCurrent(current + 1);
  };

  if (loading) return <p>Loading questions...</p>;

  if (current >= questions.length)
    return (
      <div className="quiz-result">
        <h2>Quiz Completed 🎉</h2>
        <p>
          You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>
        </p>
        <button
          onClick={() => {
            setCurrent(0);
            setScore(0);
            setSelected(null);
            setShowFeedback(false);
          }}
        >
          Restart Quiz
        </button>
      </div>
    );

  const progress = ((current + 1) / questions.length) * 100;
  const q = questions[current];

  return (
    <div className="quiz-card">
      <button className="back-btn" onClick={goBack}>← Back</button>

      <div className="quiz-progress-wrapper">
        <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <p className="question-count">
        Question {current + 1} of {questions.length}
      </p>

      <h2>{q.questionText}</h2>

      <div className="options">
        {q.options.map((option, idx) => {
          let className = "option-btn";
          if (showFeedback) {
            if (option === q.correctAnswer) className += " correct";
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
          <p>{q.explanation}</p>
          <button className="next-btn" onClick={nextQuestion}>
            {current === questions.length - 1 ? "Finish Quiz" : "Next Question →"}
          </button>
        </div>
      )}
    </div>
  );
};

export default KnowledgeQuiz;
