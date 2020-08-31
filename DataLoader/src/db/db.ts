import authors from "./authors.json";
import awards from "./awards.json";
import books from "./books.json";

export async function getBooks() {
  await performDbCall();
  return books;
}

export async function getAuthorById(id: string) {
  await performDbCall();
  return authors.find((author) => author.id === id);
}

export async function getAuthorsByIds(ids: readonly string[]) {
  await performDbCall();
  const matchingAuthors = authors.filter((author) => ids.includes(author.id));
  /** transform results */
  return ids.map((id) => matchingAuthors.find((author) => id === author.id));
}

export async function getAwardsByAuthorId(authorId: string) {
  await performDbCall();
  return awards.filter((award) => award.authorId === authorId);
}

export async function getAwardsByAuthorIds(authorIds: readonly string[]) {
  await performDbCall();
  const matchingAwards = awards.filter((award) =>
    authorIds.includes(award.authorId)
  );
  /** transform results */
  return authorIds.map((authorId) =>
    matchingAwards.filter((award) => award.authorId === authorId)
  );
}

// ---- Utils -----

let dbCallsCount = 0;
async function performDbCall() {
  dbCallsCount++;
  return new Promise((r) => setTimeout(r, 1000));
}

export function clearCounter() {
  dbCallsCount = 0;
}

export function getCounter() {
  return dbCallsCount;
}
