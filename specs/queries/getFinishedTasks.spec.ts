
import { getFinishedTasks } from "@/graphql/resolvers/queries/getFinishedTasks";
import { Task } from "@/mongoose/task";

jest.mock("@/mongoose/task", () => ({
  Task: {
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    find: jest.fn(),
  },
}));

describe("getFinishedTasks resolver", () => {
  it("fetches all completed tasks", async () => {
    const tasks = [{ id: "1", completed: true }];
    (Task.find as jest.Mock).mockResolvedValue(tasks);

    const result = await getFinishedTasks();

    expect(Task.find).toHaveBeenCalledWith({ completed: true });
    expect(result).toEqual(tasks);
  });

  it("throws error if fetching fails", async () => {
    (Task.find as jest.Mock).mockRejectedValue(new Error("DB error"));

    await expect(getFinishedTasks()).rejects.toThrow("DB error");
  });
});
