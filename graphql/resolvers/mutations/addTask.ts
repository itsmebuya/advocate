import { Task } from "@/mongoose/task";

export const addTask = async (_: any, { input }: any) => {
  const task = await Task.create({
    title: input.title,
    description: input.description || "",
    completed: false
  });
  return task;
};
