import { useParams, Link } from "react-router-dom";
import { phishingTypes } from "../services/phishingData";
import "../styles/PhishingDetails.css";

const PhishingDetail = () => {
  const { slug } = useParams();

  const phishing = phishingTypes.find((type) => type.slug === slug);

  if (!phishing) {
    return (
      <div className="container">
        <p>Phishing type not found.</p>
        <Link to="/learn">← Back to Lessons</Link>
      </div>
    );
  }

  return (
    <main className="container">
      <Link to="/learn" className="back-button">
        ← Back to Learning
      </Link>

      <h1 className="title">{phishing.title}</h1>
      <p className="description">{phishing.description}</p>

      <section>
        <h2 className="sectionTitle">Key Characterstics</h2>
        <ul className="list">
          {phishing.characterstics.map((characterstics, index) => (
            <li key={index} className="listItem">
              {characterstics}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="sectionTitle">Examples</h2>
        <ul className="list">
          {phishing.examples.map((example, index) => (
            <li key={index} className="listItem">
              {example}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="sectionTitle">Types of {phishing.title}</h2>
        <ul className="list">
          {phishing.types.map((type, index) => (
            <li key={index} className="listItem">
              {type}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="sectionTitle">Real-world Scenarios</h2>
        <ul className="list">
          {phishing.scenarios.map((scenario, index) => (
            <li key={index} className="listItem">
              {scenario}
            </li>
          ))}
        </ul>
      </section>

      {/* Call to Action for the Quiz section */}
      <footer>
        <h3>Ready to test your knowledge?</h3>
        <Link to={`/quiz/${slug}`} className="quiz-button">
          Launch Practice Lab
        </Link>
      </footer>
    </main>
  );
};

export default PhishingDetail;
