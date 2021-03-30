import connection from '../connection';

export default async function query_template(): Promise<any> {
  const result = await connection.raw(`mySQL function`);

  return result[0];
}
