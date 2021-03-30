import { Request, Response } from "express";
import insertClass from "../queries/insertClass";
import { strDateToDate } from "./../functions/strDateToDate";
import { dateDiff } from "../functions/dateDiff";
import { checkDate } from "./../functions/checkDate";
import { createId } from "./../functions/createId";
import { classBodyType } from "../types/classBodyType";

const addClass = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    const {name, startDate, endDate, module} = req.body as classBodyType
    const id: number = await createId("class");
    const convStartDate: Date = strDateToDate(startDate);
    const convEndDate: Date = strDateToDate(endDate);
    for (let key in req.body) {
      if (!req.body[key]) {
        errorCode = 422;
        throw new Error(`'${key}' field is empty or null.`);
      }
    }
    if (!name || !startDate || !endDate || !module) {
      errorCode = 422;
      throw new Error(
        `'name', 'startDate', 'endDate' and 'module' are mandatory parameters in body!`
      );
    }
    if (name.length < 3) {
      errorCode = 422;
      throw new Error("Name must be at least 3 characters.");
    }
    if (!checkDate(startDate) || !checkDate(endDate)) {
      errorCode = 422;
      throw new Error(`invalid date type. Use the format DD/MM/YYYY`);
    }
    if (dateDiff(convStartDate, convEndDate) < 0) {
      errorCode = 422;
      throw new Error("'endDate' must be greater than 'startDate'!");
    }
    if (dateDiff(convEndDate, new Date()) < 0) {
      errorCode = 422;
      throw new Error("'endDate' must be greater than 'today's date'!");
    }
    if (isNaN(Number(module)) || Number(module) < 1) {
      errorCode = 422;
      throw new Error("'module' must be a positive number!");
    }
    await insertClass(id, name, convStartDate, convEndDate, module);
    res.status(201).send(`Class ${name} has been successfully registered!`);
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default addClass;
