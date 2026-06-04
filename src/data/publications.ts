export interface Publication {
  title: string;
  publisher: string;
  doi: string;
  year: string;
  summary: string;
  abstract?: string;
}

export const publications: Publication[] = [
  {
    title: "Multi-Agent Personalized Interview Coach: An AI-Powered Platform for Career Readiness",
    publisher: "IRJAEH",
    doi: "10.47392/IRJAEH.2025.0575",
    year: "2025",
    summary:
      "Developed an AI-powered career preparation platform that combines resume generation, job matching, interview simulation and personalized learning using a multi-agent architecture powered by LLMs, NLP, speech recognition and 3D conversational avatars.",
    abstract:
      "Developed to address fragmented career preparation resources, this AI-powered platform integrates interview practice, resume building, job search and personalized learning into a unified experience. The system employs specialized agents for resume creation, job matching, interview simulation, learning support and performance tracking. Leveraging voice recognition, NLP, large language models and 3D conversational avatars, the platform improves candidate confidence, job-description alignment and overall career readiness while supporting Sustainable Development Goals 4, 8 and 9."
  },
  {
    title: "Marching Forward: Redefining Human–Machine Interactions in Conversational AI Through Hybrid Intelligence, Blockchain Security and Autonomous Agents",
    publisher: "IEEE ICCES",
    doi: "10.1109/ICCES63552.2024.10859659",
    year: "2024",
    summary:
      "Explores advances in conversational AI, including transformer-based architectures, reinforcement learning, retrieval-augmented generation, hybrid symbolic-neural systems and blockchain-enabled decentralized AI frameworks.",
    abstract:
      "This paper examines recent developments in conversational AI, focusing on improvements in natural language generation, dialogue systems and dynamic response optimization. It analyzes transformer-based models, reinforcement learning techniques, retrieval-augmented architectures and hybrid symbolic-deep learning approaches. The study also investigates blockchain as a foundation for decentralized AI systems, enabling secure, transparent and privacy-preserving interactions while advancing intelligent and personalized conversational experiences."
  }
];