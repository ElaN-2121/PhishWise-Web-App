export const phishingTypes = [
  {
    id: 1,
    slug: "email-phishing",
    title: "Email Phishing",
    description:
      "Email phishing is a form of social engineering attack that manipulates human psychology rather than exploiting technical flaws. Attackers send deceptive emails that appear authentic to mislead recipients.",
    examples: [
      "Attackers used phishing emails to steal employee credentials, leading to the leak of confidential data, internal emails, and unreleased films. The breach caused massive reputational damage and cost the company millions. Lesson: Train employees regularly to recognize social engineering tactics and implement MFA across all accounts.",
    ],
    characterstics: [
      "- Urgent or threatening language to create a sense of panic",
      "- Suspicious links or attachments that lead to fake websites",
      "- Generic greetings instead of personalized salutations",
      "- Requests for sensitive information like passwords or credit card details",
    ],
    scenarios: [
      "An employee receives an urgent email from IT requesting credentials",
      "A student gets a scholarship email leading to a fake login page",
    ],
    types: [
      "Deceptive Phishing: The most common form, where attackers impersonate legitimate entities to steal sensitive information.",
      "Spear Phishing: Targeted attacks on specific individuals or organizations, often using personalized information to appear credible.",
      "Whaling: A type of spear phishing that targets high-profile individuals like executives or celebrities.",
      "Clone Phishing: Attackers create a nearly identical copy of a legitimate email but replace links or attachments with malicious ones.",
      "Business Email Compromise (BEC): Attackers impersonate company executives or partners to trick employees into transferring money or sensitive data.",
    ],
  },
  {
    id: 2,
    slug: "smishing",
    title: "Smishing",
    description:
      " Smishing (SMS phishing) is a type of cyberattack where criminals send fraudulent text messages to trick recipients into revealing sensitive information or clicking malicious links.",
    examples: [
      "Text claiming your package is delayed",
      "SMS asking you to reset your bank PIN",
    ],
    characterstics: [
      "- Urgent or threatening language to create a sense of panic",
      "- Suspicious links or attachments that lead to fake websites",
      "- Generic greetings instead of personalized salutations",
      "- Requests for sensitive information like passwords or credit card details",
    ],
    scenarios: [
      "User clicks a delivery link and enters card details",
      "Victim calls a fake support number from an SMS",
    ],
    types: [
      "Government Scams: Impersonate authorities demanding urgent action.",
      "Prize/Reward Scams: Claim you’ve won something valuable.",
      "Banking Scams: Attackers create a nearly identical copy of a legitimate email but replace links or attachments with malicious ones.",
      "Charity Scams: Attackers impersonate company executives or partners to trick employees into transferring money or sensitive data.",
    ],
  },
  {
    id: 3,
    slug: "vishing",
    title: "Vishing",
    description:
      "Vishing (Voice phishing) is a form of phishing that uses phone calls to trick victims into revealing sensitive information or performing actions that compromise their security.",
    examples: [
      "A caller claims to be from your bank and asks for your account details",
      "An automated voice message asks you to call a toll-free number to update your account information",
    ],
    characterstics: [
      "- Impersonation: Attackers pose as bank representatives, government officials, or tech support agents.",
      "- Urgency & Fear: Calls often warn of suspicious activity, unpaid bills, or legal consequences.",
      "- Requests for Sensitive Data: Ask for account numbers, PINs, passwords, or Social Security numbers.",
      "- Caller ID Spoofing: Numbers may appear legitimate, mimicking banks or service providers.",
    ],
    scenarios: [
      "Victim receives a phone call from someone claiming to be from their bank",
      "An automated voice message prompts the victim to call a fake support line",
    ],
    types: [
      "Bank/Financial Scams: Pretend to be from your bank to “verify” suspicious transactions.",
      "Tech Support Scams: Claim your computer is infected and offer fake support",
      "Voicemail Scams: Leave alarming messages urging callbacks."
    ],
  },
  {
    id: 4,
    slug: "pharming",
    title: "Pharming",
    description:
      "Pharming is a cyberattack that redirects users to fake websites even when they type the correct URL in their browser.",
    examples: [
      "A user types 'https://www.bank.com' but is redirected to a fake bank website",
      "The user's DNS settings are altered to redirect traffic to malicious sites",
    ],
    characterstics: [
      "- Redirects users to fake websites even when typing the correct URL",
      "- Alters DNS settings or uses malware to redirect traffic",
      "- Often involves compromised routers or DNS servers",
      "- Can be difficult to detect because it mimics legitimate websites",
    ],
    scenarios: [
      "User visits a legitimate website but is redirected to a fake one",
      "A compromised router redirects all traffic through a malicious site",
    ],
    types: [
      "DNS Spoofing: Attackers manipulate DNS records to redirect users.",
      "Malware-based Pharming: Malware on the user's device changes browser settings.",
      "Router-based Pharming: Compromised routers redirect all traffic.",
    ],
  },
  {
    id: 5,
    slug: "Angler-Phishing",
    title: "Angler Phishing",
    description:
      "Angler phishing is a type of social media scam where attackers create fake customer service accounts to trick users into sharing sensitive information or clicking malicious links.",
    examples: [
      "A user receives a direct message from a fake customer support account asking for order details",
      "An attacker creates a fake Twitter account impersonating a popular brand and responds to customer complaints with malicious links",
    ],
    characterstics: [
      "- Attackers create fake customer service accounts on social media platforms",
      "- They respond to customer complaints or inquiries with malicious links",
      "- Often impersonate well-known brands to gain trust",
      "- Can lead to credential theft or malware infections",
    ],
    scenarios: [
      "User receives a direct message from a fake customer support account asking for order details",
      "An attacker creates a fake Twitter account impersonating a popular brand and responds to customer complaints with malicious links",
    ],
    types: [
      "Brand Impersonation: Attackers create accounts   that mimic popular brands to gain trust.",
      "Customer Service Scams: Respond to customer complaints with malicious links.",
      "Influencer Impersonation: Fake accounts impersonate influencers to promote scams.",
    ],
  }, 
  {
    id: 6,
    slug: "evil-twin-phishing",
    title: "Evil Twin Phishing",
    description:
      "Evil twin phishing is a type of cyberattack where attackers set up a fake Wi-Fi hotspot that mimics a legitimate one to trick users into connecting and stealing their data.",
    examples: [
      "A user connects to a Wi-Fi network named 'CoffeeShop_WiFi' which is actually an evil twin set up by an attacker",
      "The attacker captures the user's login credentials and personal information when they connect to the fake hotspot",
    ],
    characterstics: [
      "- Attackers create fake Wi-Fi hotspots that mimic legitimate ones",
      "- Users are tricked into connecting to the fake network",
      "- Attackers can capture sensitive data like login credentials and personal information",
      "- Often used in public places like cafes, airports, and hotels",
    ],
    scenarios: [
      "A user connects to a Wi-Fi network named 'CoffeeShop_WiFi' which is actually an evil twin set up by an attacker",
      "The attacker captures the user's login credentials and personal information when they connect to the fake hotspot",
    ],
    types: [
      "Rogue Access Points: Attackers set up unauthorized Wi-Fi hotspots in public places.",
      "Man-in-the-Middle Attacks: Once connected, attackers can intercept and manipulate data.",
      "Credential Harvesting: Attackers capture login credentials and personal information.",
    ],
   }
];
