import { Request, Response } from "express";
import findData from "../queries/findData";
import { findAge } from "./../functions/findAge";

const getStudentAge = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    const id: number = Number(req.params.id);
    const profile:any= await findData("student","id",id);
    const age:number = findAge(profile.birthdate);
    res.status(200).send({ user: { name: profile.name, age: age } });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default getStudentAge;
