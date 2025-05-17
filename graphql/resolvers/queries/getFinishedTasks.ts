import { Task } from "@/mongoose/task";

export const getFinishedTasks = async () => {
  return Task.find({ completed: true });
};