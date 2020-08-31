import DataLoader from "dataloader";
import { makeExecutableSchema } from "graphql-tools";
import { readFileSync } from "fs";
import path from "path";
import * as db from "./db";

const pathToSchema = path.resolve(__dirname, "./schema.graphql");
const schemaString = readFileSync(pathToSchema).toString();

export const schema = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers: {
    Query: {
      books: () => db.getBooks(),
    },
    Book: {
      author: (root) => db.getAuthorById(root.authorId),
    },
    Author: {
      awards: (root) => db.getAwardsByAuthorId(root.id),
    },
  },
});

const authorLoader = new DataLoader<string, any>(db.getAuthorsByIds);
const awardsLoader = new DataLoader<string, any>(db.getAwardsByAuthorIds);

export const schemaWithDataLoader = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers: {
    Query: {
      books: () => db.getBooks(),
    },
    Book: {
      author: (root) => authorLoader.load(root.authorId),
    },
    Author: {
      awards: (root) => awardsLoader.load(root.id),
    },
  },
});
