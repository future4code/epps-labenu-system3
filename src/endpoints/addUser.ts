import { Request, Response } from "express";
import insertPerson from "../queries/insertPerson";
import { checkDate } from "../functions/checkDate";
import { checkEmail } from "../functions/checkEmail";
import { strDateToDate } from "../functions/strDateToDate";
import { createId } from "./../functions/createId";
import findData from "../queries/findData";
import { findAge } from "./../functions/findAge";
import { personBodyType } from "../types/personBodyType";

const addUser = async (req: Request, res: Response) => {
  let errorCode: number = 400;
  try {
    const {category, name, email, birthdate, classId} = req.body as personType
    const id: number = await createId(category);

    for (let key in req.body) {
      if (!req.body[key]) {
        errorCode = 422;
        throw new Error(`'${key}' field is empty or null.`);
      }
    }
    if (!category || !name || !email || !birthdate || !classId) {
      errorCode = 422;
      throw new Error(
        `'category', 'name', 'email', 'birthdate' and 'classId' are mandatory parameters in body!`
      );
    }
    if (!checkEmail(email)) {
      errorCode = 422;
      throw new Error(`invalid e-mail type.`);
    }
    const findStudentEmail:any = await findData("student", "email", email);
    const findTeacherEmail:any = await findData("teacher", "email", email);
    if (
      (findStudentEmail && findStudentEmail.length > 0) ||
      (findTeacherEmail && findTeacherEmail.length > 0)
    ) {
      errorCode = 422;
      throw new Error(`E-mail already registered.`);
    }
    let modDate: Date;
    if (!checkDate(birthdate)) {
      errorCode = 422;
      throw new Error(`invalid date type. Use the format DD/MM/YYYY`);
    } else {
      modDate = strDateToDate(birthdate);
    }
    if (findAge(modDate) < 18) {
      errorCode = 422;
      throw new Error(`Invalid age. You must be over 18 to register.`);
    }
    if (category.toLowerCase() !== "student" && category !== "teacher") {
      errorCode = 422;
      throw new Error(
        `Invalid category. Choose between 'student' or 'teacher'.`
      );
    }
    if (isNaN(Number(classId)) || Number(classId) < 1) {
      errorCode = 422;
      throw new Error("'classId' must be a positive number!");
    }
    const findClassId:any = await findData("class", "id", classId);
    if (findClassId.length < 1) {
      errorCode = 404;
      throw new Error("'classId' not found.");
    }
    await insertPerson(category, id, name, email, modDate, classId);
    res
      .status(200)
      .send(
        `${category.charAt(0).toUpperCase() + category.slice(1)} registered!`
      );
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default addUser;
