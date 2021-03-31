import { Request, Response } from "express";
import { people } from "../fakeData/people";
import insertPerson from "../queries/insertUser";
import { createId } from "../functions/createId";
import getMaxIdNumber from "../queries/getMaxIdNumber";

const addFakeUsers = async (req: Request, res: Response) => {
  let errorCode: number = 400;
  try {
    const table:string = "teacher";
    for (let i = 161; i < people.length; i++) {
      // const id: number = await createId("class");
      const id: number = i+1;
      const name:string = people[i].name.first + " " + people[i].name.last;
      const email:string = people[i].email;
      const birthdate:Date = new Date(people[i].dob.date);
      await insertPerson(table, id, name, email, birthdate);
    }
    res.status(200).send("Users generated!");
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default addFakeUsers;
