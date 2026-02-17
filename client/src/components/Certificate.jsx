import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import Logo from "../../public/logo.png";
import "../styles/certificate.css";

const Certificate = () => {
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/certificate`, {
          method: "POST", // or GET if verifying
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCertificate(data.certificate);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCertificate();
  }, []);

  const handleDownload = () => {
    const element = document.getElementById("certificate-preview");
    html2pdf()
      .set({
        margin: 0.5,
        filename: `Phishing-Certificate-${certificate.user.name}.pdf`,
        html2canvas: { scale: 2 },
      })
      .from(element)
      .save();
  };

  if (!certificate) return <p>Loading certificate...</p>;

  return (
    <div className="certificate-page">
      <h2>🎓 Your Certificate</h2>
      <div id="certificate-preview" className="certificate-card">
        <div className="flag top-left"></div>
        <div className="flag top-right"></div>
        <div className="certificate-border">
          <img src={Logo} alt="Logo" className="certificate-logo" />
          <h1>Certificate of Completion</h1>
          <p>This certifies that</p>
          <h2>{certificate.user.name}</h2>
          <p>
            has successfully completed the <strong>Phishing Awareness Training</strong>
          </p>
          <p>Level Achieved: <strong>{certificate.level}</strong></p>
          <p>Issued on: {new Date(certificate.issuedAt).toLocaleDateString()}</p>
          <p>Certificate ID: {certificate.certificateId}</p>
        </div>
      </div>
      <button onClick={handleDownload}>📄 Download Certificate</button>
    </div>
  );
};

export default Certificate;
