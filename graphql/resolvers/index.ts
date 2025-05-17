import { addTask } from "./mutations/addTask";
import { updateTask } from "./mutations/updateTask";
import { getAllTasks } from "./queries/getAllTasks";
import { getFinishedTasks } from "./queries/getFinishedTasks";

export const resolvers = {
  Query: {
    getAllTasks,
    getFinishedTasks
  },
  Mutation: {
    addTask,
    updateTask
  },
};
