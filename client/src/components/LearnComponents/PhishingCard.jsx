import { Link } from "react-router-dom";

const PhishingCard = ({ data }) => {
  return (
    <Link to={`/learn/${data.slug}`} className="phishing-card">
      <h3>{data.title}</h3>
      <p>{data.description}</p>
    </Link>
  );
};

export default PhishingCard;
