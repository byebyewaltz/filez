import db from "#db/client";

/** @returns all files, each with the containing folder's name as `folder_name` */
export async function getFiles() {
  const sql = `
    SELECT
      files.*,
      folders.name AS folder_name
    FROM files
    JOIN folders ON folders.id = files.folder_id
    ORDER BY files.id
  `;
  const { rows: files } = await db.query(sql);
  return files;
}

/** @returns the newly created file */
export async function createFile({ name, size, folder_id }) {
  const sql = `
    INSERT INTO files (name, size, folder_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const {
    rows: [file],
  } = await db.query(sql, [name, size, folder_id]);
  return file;
}