export interface Experience {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export const experience: Experience[] = [
  {
    role: "Engineering Trainee",
    company: "Telesoft Technologies (UK) - Delhi NCR",
    period: "2025 - Present",
    points: [
      "Contributed to the development of IntSOC, an AI-powered Network Detection and Response (NDR) platform for real-time network security monitoring.",
      "Built and enhanced frontend features using React and TypeScript, and developed backend integrations using Node.js and REST APIs to support real-time data visualization.",
      "Collaborated with a UK-based engineering team to debug issues and improve system stability and performance."
    ]
  }
];
