import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(getComments().map(comment => db.comment.create({ data: comment })));
}

seed();

function getComments() {
  return [
    {
      title: 'Comment 1',
      name: 'John Doe',
      rating: 4,
      comment: 'This is a test comment',
    },
  ]
}