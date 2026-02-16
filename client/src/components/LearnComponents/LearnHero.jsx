import "../../styles/learn.css";
const LearnHero = () => {
  return (
    <section className="learn-hero">
      <h1>Learn About Phishing Attacks</h1>
      <div className="hero-container">
        <p>Phishing isn’t just email anymore.</p>
        <ul className="phishing-type-list">
          <li>
            Email phishing is still the most common, flooding inboxes with fake
            links and attachments.
          </li>
          <li>Smishing hits your phone with urgent texts.</li>
          <li>Vishing pressures you through voice calls.</li>
          <li>
            Angler phishing lurks on social media, posing as customer support.
          </li>
          <li>Pharming silently redirects you to fake websites.</li>
          <li>Evil twin phishing tricks you with rogue Wi‑Fi hotspots.</li>
        </ul>
        <p>
          No matter the channel, the goal is the same: steal your data and
          money. 👉 Stay alert, verify sources, and never trust urgency without
          proof
        </p>
      </div>
    </section>
  );
};

export default LearnHero;
