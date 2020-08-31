import { graphql } from "graphql";

import { schema, schemaWithDataLoader } from "./schema";
import { clearCounter, getCounter } from "./db";

const query = `
{
  books {
    id
    title
    author {
      id
      name
      awards {
        id
        title
        year
      }
    }
  }
}
`;

run();

async function run() {
  const mark1 = Date.now();
  clearCounter();
  console.log("Executing schema without DataLoader");
  await graphql(schema, query);

  const mark2 = Date.now();

  console.log(`Execution time: ${mark2 - mark1}ms`);
  console.log(`DB calls count: ${getCounter()}`);

  clearCounter();
  console.log("Executing schema with DataLoader");
  await graphql(schemaWithDataLoader, query);

  const mark3 = Date.now();
  console.log(`Execution time: ${mark3 - mark2}ms`);
  console.log(`DB calls count: ${getCounter()}`);
}
