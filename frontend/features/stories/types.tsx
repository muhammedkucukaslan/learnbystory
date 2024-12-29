export type Story = {
  id: string;
  title: string;
  content: string;
  interest: string;
  result: string;
  level: string;
  difficulty: string;
  createdAt: Date;
};

export type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
};
