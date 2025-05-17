import { Task } from "@/mongoose/task";

export const updateTask = async (_: any, { id, completed }: { id: string; completed: boolean }) => {
  const task = await Task.findByIdAndUpdate(
    id,
    { completed },
    { new: true }
  );
  return task;
};
