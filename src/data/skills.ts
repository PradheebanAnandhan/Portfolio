export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: "Programming Languages",
    items: ["C", "C++", "Python", "Java"]
  },
  {
    category: "Generative AI",
    items: ["LLMs", "RAG", "LangChain", "Embeddings", "Agentic AI", "Prompt Engineering"]
  },
  {
    category: "Web & Backend",
    items: ["HTML", "CSS", "React.js", "Node.js", "Express.js", "REST APIs"]
  },
  {
    category: "Core & Data",
    items: ["Machine Learning", "Deep Learning", "NLP", "Transformers", "SQL", "MongoDB", "DSA"]
  }
];
