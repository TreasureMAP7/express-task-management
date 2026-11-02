export type Task = {
  id: number;
  title: string;
  description: string;
  category: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
};
