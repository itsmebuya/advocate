
import { getAllTasks } from "@/graphql/resolvers/queries/getAllTasks";
import { Task } from "@/mongoose/task";

jest.mock("@/mongoose/task", () => ({
  Task: {
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    find: jest.fn(),
  },
}));

describe("getAllTasks resolver", () => {
  it("fetches all incomplete tasks", async () => {
    const tasks = [{ id: "1", completed: false }];
    (Task.find as jest.Mock).mockResolvedValue(tasks);

    const result = await getAllTasks(null, { completed: false });

    expect(Task.find).toHaveBeenCalledWith({ completed: false });
    expect(result).toEqual(tasks);
  });

  it("fetches all tasks if no filter provided", async () => {
    const tasks = [{ id: "1", completed: false }, { id: "2", completed: true }];
    (Task.find as jest.Mock).mockResolvedValue(tasks);

    const result = await getAllTasks(null, {});

    expect(Task.find).toHaveBeenCalledWith({});
    expect(result).toEqual(tasks);
  });

  it("throws error if fetching fails", async () => {
    (Task.find as jest.Mock).mockRejectedValue(new Error("DB error"));

    await expect(getAllTasks(null, { completed: true })).rejects.toThrow("DB error");
  });
});
