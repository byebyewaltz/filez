import db from "#db/client";
import { createFolder } from "#db/queries/folders";
import { createFile } from "#db/queries/files";
import { faker } from "@faker-js/faker"

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");


// create the folders - 3 folders and had to create files 5 files per folder 
async function seed() {
  for (let i = 0; i < 3; i++) {
  const folder = await createFolder({ name: faker.person.fullName() });

  for (let i = 0; i < 5; i++) {
    await createFile({
      name: faker.system.fileName(),
      size: faker.number.int({ min: 1, max: 10000 }),
      folder_id: folder.id
    });
  }
}
}