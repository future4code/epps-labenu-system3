import connection from "../connection";

export default async function insertPerson(
  table: string,
  id: number,
  name: string,
  email: string,
  birthdate: Date,
  classId: number
): Promise<any> {
  await connection(table).insert({
    id: id,
    name: name,
    email: email,
    birthdate: birthdate,
    class_id: classId
  });
}
