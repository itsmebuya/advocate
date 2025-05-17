export type Task = {
  id: string;
  title: string;
  description?: string;
  isFinished: boolean;
  isDeleted: boolean;
};

export type Query = {
  getAllTasks: () => Task[];
  getFinishedTasksLists: () => Task[];
};

export type Mutation = {
  addTask: (title: string, description?: string) => Task;
  updateTask: (
    id: string,
    title?: string,
    description?: string,
    isFinished?: boolean,
    isDeleted?: boolean
  ) => Task;
};
