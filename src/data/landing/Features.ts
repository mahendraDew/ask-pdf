import { FileSearch, Smile, DollarSign, Clock, Layers, Settings } from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: React.ElementType; // This will be the component for the icon
}

export const Features: Feature[] = [
  {
    title: "Accurate Answers",
    description:
      "Our advanced machine learning algorithms can quickly and accurately analyze any PDF file to provide you with the answers you need.",
    icon: FileSearch, // Icon for accuracy or searching
  },
  {
    title: "Easy to Use",
    description:
      "AskPDF is designed with ease of use in mind. Simply upload your PDF file, ask your question, and get your answer in seconds.",
    icon: Smile, // Icon for user-friendliness
  },
  {
    title: "Cost-Effective",
    description:
      "AskPDF provides an affordable alternative to hiring a team of researchers or wasting hours of your own time digging through a PDF file.",
    icon: DollarSign, // Icon for affordability
  },
  {
    title: "Time-Saving",
    description:
      "AskPDF can analyze even the most complex PDF files in seconds, saving you valuable time and effort.",
    icon: Clock, // Icon for saving time
  },
  {
    title: "Scalable",
    description:
      "AskPDF is designed to handle any number of PDF files, making it an ideal solution for businesses of all sizes.",
    icon: Layers, // Icon for scalability
  },
  {
    title: "Customizable",
    description:
      "AskPDF can be customized to meet your specific needs. Whether you need a particular feature or a custom integration, we can help.",
    icon: Settings, // Icon for customization
  },
];
