import { phishingTypes } from "../../services/phishingData";
import PhishingCard from "./PhishingCard";

const PhishingGrid = () => {
  return (
    <section className="phishing-grid">
      {phishingTypes.map(type => (
        <PhishingCard key={type.slug} data={type} />
      ))}
    </section>
  );
};

export default PhishingGrid;
