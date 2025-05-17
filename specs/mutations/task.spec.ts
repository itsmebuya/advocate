
import { getAllTasks } from "@/graphql/resolvers/queries/getAllTasks";
import { Task } from "@/mongoose/task";

jest.mock("@/mongoose/task");

describe("getAllTasks resolver", () => {
  it("returns tasks filtered by completed", async () => {
    // Mock Task.find to return fake tasks
    (Task.find as jest.Mock).mockResolvedValue([
      { id: "1", title: "Test task", completed: false },
    ]);

    const tasks = await getAllTasks(null, { completed: false });

    expect(Task.find).toHaveBeenCalledWith({ completed: false });
    expect(tasks).toHaveLength(1);
  });

  it("returns all tasks if no filter passed", async () => {
    (Task.find as jest.Mock).mockResolvedValue([
      { id: "1", title: "Task 1", completed: false },
      { id: "2", title: "Task 2", completed: true },
    ]);

    const tasks = await getAllTasks(null, {});

    expect(Task.find).toHaveBeenCalledWith({});
    expect(tasks).toHaveLength(2);
  });
});
