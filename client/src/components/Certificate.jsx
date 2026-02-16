import React, { useState } from "react";
import html2pdf from "html2pdf.js";
import "../styles/certificate.css";

const Certificate = ({ level = "Intermediate" }) => {
  const [name, setName] = useState("");

  const handleDownload = () => {
    const element = document.getElementById("certificate-preview");
    html2pdf()
      .set({
        margin: 0.5,
        filename: `Phishing-Certificate-${name}.pdf`,
        html2canvas: { scale: 2 },
      })
      .from(element)
      .save();
  };

  return (
    <div className="certificate-page">
      <h2>🎓 Generate Your Certificate</h2>

      {/* Input Section */}
      <div className="certificate-form">
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button disabled={!name.trim()} onClick={handleDownload}>
          📄 Download Certificate
        </button>
      </div>

      {/* Certificate Preview */}
      <div id="certificate-preview" className="certificate-card">
        {/* Decorative Ethiopian corner flags */}
        <div className="flag top-left"></div>
        <div className="flag top-right"></div>

        <div className="certificate-border">
          {/* Optional Logo */}
          <img
            src="../../public/logo.png"
            alt="Logo"
            className="certificate-logo"
          />

          <h1>Certificate of Completion</h1>
          <p className="certifies">This certifies that</p>
          <h2>{name || "Your Name"}</h2>
          <p className="description">
            has successfully completed the <strong>Phishing Awareness Training</strong>
          </p>
          <p className="level">Level Achieved: <strong>{level}</strong></p>
          <p className="date">{new Date().toLocaleDateString()}</p>
          <p className="issuer">
            Issued by: Phishing Awareness Platform – Ethiopia
          </p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
