import connection from "../connection";

export default async function insertPerson(
  table: string,
  id: number,
  name: string,
  email: string,
  birthdate: Date
): Promise<any> {
  await connection.raw(`
  INSERT INTO ${table} (id, name, email, birthdate)
  VALUES
  (${id}, "${name}", "${email}", "${birthdate}"})
  `);
}
