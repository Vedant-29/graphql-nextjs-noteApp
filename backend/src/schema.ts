export const typeDefs = `
  #graphql
  type Note {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    notes(search: String): [Note!]!
    note(id: ID!): Note
  }

  type Mutation {
    createNote(title: String!, content: String!): Note!
    updateNote(id: ID!, title: String, content: String): Note!
    deleteNote(id: ID!): Boolean!
  }
`;