import React, { createContext, useState, useContext } from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [stats, setStats] = useState({
    knowledgeCompleted: 0,
    realWorldCompleted: 0,
    labsCompleted: 0,
    totalScore: 0, // cumulative points
    level: "Beginner",
    percentages: {
      knowledge: 0,
      realWorld: 0,
      lab: 0,
    },
  });

  const updateStats = (score, type) => {
    setStats((prev) => {
      const newStats = { ...prev };

      // Increment completed quizzes for this type
      if (type === "knowledge") newStats.knowledgeCompleted += 1;
      else if (type === "realWorld") newStats.realWorldCompleted += 1;
      else if (type === "lab") newStats.labsCompleted += 1;

      // Update cumulative total score
      newStats.totalScore += score;

      // Track latest percentage for each quiz type
      newStats.percentages[type] = score;

      // Determine level
      const totalQuizzesCompleted =
        newStats.knowledgeCompleted +
        newStats.realWorldCompleted +
        newStats.labsCompleted;

      if (newStats.totalScore / totalQuizzesCompleted >= 90) newStats.level = "Expert";
      else if (newStats.totalScore / totalQuizzesCompleted >= 70) newStats.level = "Intermediate";
      else newStats.level = "Beginner";

      return newStats;
    });
  };

  return (
    <ScoreContext.Provider value={{ stats, updateStats }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);
