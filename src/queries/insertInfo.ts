import connection from "../connection";

export default async function insertInfo(
  table: string,
  id: number,
  title: string
): Promise<any> {
  await connection(table).insert({
    id: id,
    title: title,
  });
}
