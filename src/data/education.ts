export interface Education {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export const education: Education[] = [
  {
    degree: "B.E (CSE - AIML) | CGPA: 8.0",
    institution: "Sri Eshwar College of Engineering",
    period: "2022 - 2026",
    details: "Focusing on Artificial Intelligence and Machine Learning."
  },
  {
    degree: "HSC | 91.8%",
    institution: "ARLM Higher Secondary School",
    period: "2020 - 2022"
  },
  {
    degree: "SSLC | 79.4%",
    institution: "Lakshmi Matric High School",
    period: "2019 - 2020"
  }
];
