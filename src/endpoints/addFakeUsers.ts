import { Request, Response } from "express";
import { people } from "../fakeData/people";
import insertPerson from "../queries/insertPerson";
import { createId } from "../functions/createId";

const addFakeUsers = async (req: Request, res: Response) => {
  let errorCode: number = 400;
  try {
    const table:string = "teacher";
    for (let i = 50; i < 65; i++) {
      const id: number = await createId("class");
      const name:string = people[i].name.first + " " + people[i].name.last;
      const email:string = people[i].email;
      const birthdate:Date = new Date(people[i].dob.date);
      const classId:number = Math.floor(Math.random() * 3) + 1;
      await insertPerson(table, id, name, email, birthdate, classId);
    }
    res.status(200).send("Users generated!");
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default addFakeUsers;
