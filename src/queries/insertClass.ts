import connection from "../connection";

export default async function insertClass(
  id: number,
  name: string,
  startDate: Date,
  endDate: Date,
  module: number
): Promise<any> {
  await connection.raw(`
  INSERT INTO class (id, name, start_date, end_date, module)
  VALUES
  (${id}, "${name}", "${startDate}", "${endDate}", ${module})
  `);
}
