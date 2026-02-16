import {React, useState} from "react";
import "../styles/Learn.css";
import LearnHero from "../components/LearnComponents/LearnHero";
import PhishingGrid from "../components/LearnComponents/PhishingGrid";

const Learn = () => {
  return (
    <main className="learn">
      <LearnHero />
      <PhishingGrid />
    </main>
  );
};

export default Learn;
