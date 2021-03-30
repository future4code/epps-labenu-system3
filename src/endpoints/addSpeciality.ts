import { Request, Response } from "express";
import insertInfo from "../queries/insertInfo";
import findData from "../queries/findData";
import { createId } from "../functions/createId";

const addSpeciality = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    const title: string = req.body.title;
    const id: number = await createId("teacher");
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
      throw new Error("Speciality must be at least 3 characters.");
    }
    const findSpeciality: any = await findData("speciality", "title", title);
    if (findSpeciality.length > 0) {
      errorCode = 409;
      throw new Error(`Speciality '${title}' is already registered!`);
    }
    await insertInfo("speciality", id, title);
    res.status(201).send({ message: "Speciality registered!" });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default addSpeciality;
