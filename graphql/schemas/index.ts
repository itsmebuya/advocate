import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
  }

  input TaskInput {
    title: String!
    description: String
  }

  input UpdateTaskInput {
    completed: Boolean!
  }

  type Mutation {
    addTask(input: TaskInput!): Task!
    updateTask(id: ID!, completed: Boolean!): Task!
  }

  type Query {
    getAllTasks(completed: Boolean): [Task!]!
    getFinishedTasks: [Task!]!
  }
`;
