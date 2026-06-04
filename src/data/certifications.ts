export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export const certifications: Certification[] = [
  {
    name: "Mastering DSA using C and C++",
    issuer: "Udemy",
    year: "2024"
  },
  {
    name: "Crash Course on Python",
    issuer: "Coursera",
    year: "2024"
  },
  {
    name: "Supervised Machine Learning",
    issuer: "Deep Learning AI, Stanford University",
    year: "2024"
  },
  {
    name: "Japanese-Language Proficiency Test - N5",
    issuer: "JLPT",
    year: "2024"
  },
  {
    name: "Hacker Rank - Python, SQL",
    issuer: "HackerRank",
    year: "2024"
  }
];
