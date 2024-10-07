const transactionTypeDef = `#graphql
  scalar Date

  type Transaction {
    _id: ID!
    description: String!
    category: String!
    option: String!
    amount: Float!
    location: String
    date: Date!
  }

  type Query {
    transactions: [Transaction!]
    transaction(transactionId: ID!): Transaction
    categoryStatistics: [CategoryStatistics!]
  }

  type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction!
    updateTransaction(input: UpdateTransactionInput!): Transaction!
    deleteTransaction(transactionId: ID!): Transaction!
  }

  type CategoryStatistics {
    category: String!
    totalAmount: Float!
  }

  input CreateTransactionInput {
    description: String!
    category: String!
    option: String!
    amount: Float!
    date: Date!
    location: String
  }

  input UpdateTransactionInput {
    transactionId: ID!
    description: String
    category: String
    option: String
    amount: Float
    location: String
    date: Date
  }
`;

export default transactionTypeDef;
