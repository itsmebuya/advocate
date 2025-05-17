
import { updateTask } from "@/graphql/resolvers/mutations/updateTask";
import { Task } from "@/mongoose/task";

jest.mock("@/mongoose/task");

describe("updateTask resolver", () => {
  it("updates the task and returns it", async () => {
    const updatedTask = { id: "1", completed: true };
    (Task.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedTask);

    const result = await updateTask(null, { id: "1", completed: true });

    expect(Task.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "1" },
      { completed: true },
      { new: true }
    );
    expect(result).toEqual(updatedTask);
  });

  it("throws error if update fails", async () => {
    (Task.findOneAndUpdate as jest.Mock).mockRejectedValue(new Error("DB update error"));

    await expect(updateTask(null, { id: "1", completed: false })).rejects.toThrow("DB update error");
  });
});
