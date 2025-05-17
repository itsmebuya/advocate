
import { addTask } from "@/graphql/resolvers/mutations/addTask";
import { Task } from "@/mongoose/task";

jest.mock("@/mongoose/task");

describe("addTask", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("creates a task successfully", async () => {
    const mockTask = { id: "1", title: "title", description: "desc", completed: false };
    (Task.create as jest.Mock).mockResolvedValue(mockTask);

    const input = { title: "title", description: "desc" };
    const result = await addTask(null, { input });

    expect(Task.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockTask);
  });

  it("throws error when creation fails", async () => {
    (Task.create as jest.Mock).mockRejectedValue(new Error("Creation failed"));

    await expect(addTask(null, { input: { title: "fail", description: "" } })).rejects.toThrow("Creation failed");
  });
});
