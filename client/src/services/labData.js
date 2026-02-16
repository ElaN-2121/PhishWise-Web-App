export const labData = [
  {
    id: 1,
    app: "SMS",
    sender: "Telebirr Service",
    message:
      "⚠️ Telebirr Alert: Your account will be blocked today.\nConfirm now: http://telebirr-secure-et.com",
    correctAction: "report",
    explanation:
      "Telebirr never sends links by SMS. The website address is fake and tries to scare you."
  },

  {
    id: 2,
    app: "WhatsApp",
    sender: "CBE Support",
    message:
      "Dear customer, unusual activity detected.\nVerify your CBE account here:\nhttp://cbe-verify-login.net",
    correctAction: "ignore",
    explanation:
      "Banks do not ask for verification through WhatsApp or unknown links."
  },

  {
    id: 3,
    app: "SMS",
    sender: "Ethio Telecom",
    message:
      "Congratulations! You have won 50GB free data.\nClaim now: http://ethio-bonus-data.info",
    correctAction: "report",
    explanation:
      "Free rewards that require clicking a link are common scams."
  }
];
