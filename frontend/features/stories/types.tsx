export type Story = {
  _id: string;
  title: string;
  content: string;
  field: string;
  result: string;
  createdAt: Date;
};

export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
};
