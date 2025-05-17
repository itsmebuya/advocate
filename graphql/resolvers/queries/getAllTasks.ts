import { Task } from "@/mongoose/task";

export const getAllTasks = async (_: any, args: { completed?: boolean }) => {
  if (typeof args.completed === "boolean") {
    return Task.find({ completed: args.completed });
  }
  return Task.find({});
};