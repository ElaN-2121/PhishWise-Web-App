import Button from "../components/common/Button";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    
    <main className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <h1>Defend Yourself Against Phishing Attacks</h1>
        <p>
          Phishing is a common cyber threat that targets users through fake
          emails, messages, and websites. Learn how to recognize attacks and
          stay protected online.
        </p>
        <Button onClick={() => navigate("/learn")} className="start-learning-button">Start Learning</Button>
      </section>

      {/* ABOUT PHISHING */}
      <section className="info">
        <h2>What Is Phishing?</h2>
        <p>
          Phishing is a cyber attack where attackers impersonate legitimate
          organizations to trick users into revealing sensitive information
          such as passwords, banking details, or personal data.
        </p>
      </section>

      {/* ATTACK TYPES */}
      <section className="features">
        <h2>Common Types of Phishing</h2>
        <div className="cards">
          <div className="card">
            <h3>Email Phishing</h3>
            <p>
              Fraudulent emails designed to look like they come from trusted
              companies or services.
            </p>
          </div>

          <div className="card">
            <h3>SMS Phishing</h3>
            <p>
              Scam text messages urging users to click malicious links or share
              information.
            </p>
          </div>

          <div className="card">
            <h3>Fake Websites</h3>
            <p>
              Websites that mimic real ones in order to steal login credentials
              and personal data.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2>How This App Helps</h2>
        <ul>
          <li>Understand how phishing attacks work</li>
          <li>Identify red flags in suspicious messages</li>
          <li>Practice with real-world phishing examples</li>
          <li>Test your knowledge through interactive quizzes</li>
        </ul>
      </section>

      {/* FINAL CTA */}
      <section className="cta">
        <h2>Start Protecting Yourself Today</h2>
        <p>
          Build strong online habits and reduce your risk of falling for phishing
          attacks.
        </p>
        <Button onClick={() => navigate("/quiz")} className="get-started-button">Get Started</Button>
      </section>
    </main>
  );
};

export default Home;
