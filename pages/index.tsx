import React, { useState, FormEvent } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const ADD_TASK = gql`
  mutation AddTask($input: TaskInput!) {
    addTask(input: $input) {
      id
      title
      description
      completed
    }
  }
`;

// Query with optional completed filter
const GET_ALL_TASKS = gql`
  query GetAllTasks($completed: Boolean) {
    getAllTasks(completed: $completed) {
      id
      title
      description
      completed
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $completed: Boolean!) {
    updateTask(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState<null | boolean>(null); // null = all, true = finished

  const { loading: queryLoading, error: queryError, data, refetch } = useQuery(GET_ALL_TASKS, {
    variables: { completed: filter === null ? undefined : filter },
  });

  const [addTask, { loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(ADD_TASK, {
    onCompleted: () => {
      refetch();
    },
  });

  const [updateTask] = useMutation(UPDATE_TASK, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({ variables: { input: { title, description } } });

    setTitle("");
    setDescription("");
  };

  const toggleComplete = (id: string, current: boolean) => {
    updateTask({ variables: { id, completed: !current } });
  };

  return (
    <div>
      <p>Hello From Pinecone Advocate Graphql Challenge</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Task Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={mutationLoading}>
          {mutationLoading ? "Adding..." : "Add Task"}
        </button>
      </form>

      {mutationError && <p style={{ color: "red" }}>Error: {mutationError.message}</p>}
      {mutationData && <p style={{ color: "green" }}>Task added successfully!</p>}

      <hr />

      <div>
        <button onClick={() => setFilter(null)} disabled={filter === null}>
          All Tasks
        </button>
        <button onClick={() => setFilter(true)} disabled={filter === true}>
          Finished Tasks
        </button>
      </div>

      {queryLoading && <p>Loading tasks...</p>}
      {queryError && <p style={{ color: "red" }}>Error loading tasks: {queryError.message}</p>}

      <ul>
        {data?.getAllTasks?.map((task: any) => (
          <li key={task.id}>
            <label style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id, task.completed)}
              />{" "}
              <strong>{task.title}</strong> - {task.description || "No description"}
            </label>{" "}
            — {task.completed ? "Completed" : "Not completed"}
          </li>
        ))}
      </ul>
    </div>
  );
}
