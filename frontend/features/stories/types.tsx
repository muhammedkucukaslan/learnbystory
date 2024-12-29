export type Story = {
  id: string;
  title: string;
  content: string;
  field: string;
  result: string;
  createdAt: Date;
};

export type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
};
