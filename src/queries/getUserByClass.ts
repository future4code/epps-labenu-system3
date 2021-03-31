import connection from "../connection";

export default async function getUserByClass(table:string, className: string): Promise<any> {
  const result = await connection.raw(`
  SELECT ${table}.*, class.name as class_name 
  FROM ${table}
  JOIN ${table}_class
  ON ${table}.id = ${table}_class.${table}_id
  JOIN class
  ON ${table}_class.${table}_id = class.id
  WHERE class.name LIKE "%${className}%"
  `);

  return result[0];
}
