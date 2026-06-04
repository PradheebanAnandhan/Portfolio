export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  content: string;
}

export const projects: Project[] = [
  {
    id: "anomaly-detect",
    name: "Anomaly Detection",
    description: "Developed an anomaly detection model using CNN and LSTM architectures trained on the UCF Crime dataset to identify suspicious activities.",
    technologies: ["Deep Learning", "Python", "Streamlit", "CNN", "LSTM"],
    githubUrl: "https://github.com/PradheebanAnandhan/Anomaly-Detection",
    content: `* Project name: Anomaly Detection\n* Description: Developed an anomaly detection model using CNN and LSTM architectures trained on the UCF Crime dataset to identify suspicious activities such as shoplifting and assault in surveillance footage. Integrated spatial and temporal modeling to improve detection accuracy and robustness for security monitoring applications.\n* Technologies used: Deep Learning, Python, Streamlit`
  },
  {
    id: "prepwise",
    name: "PrepWise",
    description: "Built an AI-driven platform to help students improve resumes, match job roles and practice interviews through voice-based simulations.",
    technologies: ["Agentic AI", "LLMs", "NLP", "React.js"],
    githubUrl: "https://github.com/PradheebanAnandhan/PrepWise",
    content: `* Project name: PrepWise\n* Description: Built an AI-driven platform to help students improve resumes, match job roles and practice interviews through voice-based simulations. Designed a multi-agent system using NLP and LLMs to provide personalized feedback and interview coaching, enhancing candidate preparation and confidence.\n* Technologies used: Agentic AI, LLMs, NLP, React.js`
  },
  {
    id: "astra",
    name: "ASTRA – AI Powered Interactive Guidance System",
    description: "Built a voice-based conversational guidance system that helps users find locations and access information through natural language interaction.",
    technologies: ["LLMs", "RAG", "Generative AI"],
    githubUrl: "",
    content: `* Project name: ASTRA – AI Powered Interactive Guidance System\n* Description: Built a voice-based conversational guidance system that helps users find locations and access information through natural language interaction. Implemented LLM and RAG-based retrieval to provide real-time responses with visual support for enhanced user experience.\n* Technologies used: LLMs, RAG, Generative AI`
  }
];
