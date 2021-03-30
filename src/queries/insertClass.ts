import connection from "../connection";

export default async function insertClass(
  id: number,
  name: string,
  startDate: Date,
  endDate: Date,
  module: number
): Promise<any> {
  const result = await connection("class").insert({
    id: id,
    name: name,
    start_date: startDate,
    end_date: endDate,
    module: module,
  });
}
