import { Request, Response } from "express";
import insertInfo from "../queries/insertInfo";
import findData from "../queries/findData";
import { createId } from './../functions/createId';

const addHobby = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    const title:string = req.body.title as string;
    const id:number = await createId("hobby");
    if (!title) {
      errorCode = 422;
      throw new Error("'title' is mandatory in body.");
    }
    if (typeof title !== "string") {
      errorCode = 422;
      throw new Error("Insert words in the field.");
    }
    if (title.length < 3) {
      errorCode = 422;
      throw new Error("Hobby must be at least 3 characters.");
    }
    const findHobby = await findData("student","title",title);
    if (findHobby.length !== 0) {
      errorCode = 409;
      throw new Error(`Hobby '${title}' is already registered!`);
    }
    await insertInfo("hobby", id, title);
    res.status(201).send("Hobby registered!");
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default addHobby;
