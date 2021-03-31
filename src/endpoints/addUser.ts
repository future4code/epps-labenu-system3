import { Request, Response } from "express";
import insertUser from "../queries/insertUser";
import { checkDate } from "../functions/checkDate";
import { checkEmail } from "../functions/checkEmail";
import { strDateToDate } from "../functions/strDateToDate";
import { createId } from "./../functions/createId";
import findData from "../queries/findData";
import { findAge } from "./../functions/findAge";
import { personBody, personBodyType } from "../types/personBody";
import { capitalize } from "./../functions/capitalize";

const addUser = async (req: Request, res: Response) => {
  let errorCode: number = 400;
  try {
    // Parâmetros do Body
    const { category, name, email, birthdate } = req.body as personBodyType;

    // Gera id
    const id: number = await createId(category);

    // VALIDAÇÕES
    // Se existe campo vazio ou ausente do body
    for (let item in personBody) {
      if (!(item in req.body)) {
        errorCode = 422;
        throw new Error(`'${item}' field is missing.`);
      }
    }

    // Se a categoria é válida
    if (category.toLowerCase() !== "student" && category !== "teacher") {
      errorCode = 422;
      throw new Error(
        `Invalid category. Choose between 'student' or 'teacher'.`
      );
    }

    // Se o formato do e-mail é válido
    if (!checkEmail(email)) {
      errorCode = 422;
      throw new Error(`invalid e-mail type.`);
    }

    // Se o e-mail já foi cadastrado
    const findStudentEmail: any = await findData("student", "email", email);
    const findTeacherEmail: any = await findData("teacher", "email", email);
    if (findStudentEmail || findTeacherEmail) {
      errorCode = 422;
      throw new Error(`E-mail already registered.`);
    }

    // Se o fomrato de data do usuário é DD/MM/YYYY
    let modDate: Date;
    if (!checkDate(birthdate)) {
      errorCode = 422;
      throw new Error(`invalid date type. Use the format DD/MM/YYYY`);
    } else {
      // Converte a data de string pra Date
      modDate = strDateToDate(birthdate);
    }

    // Se o usuário tem pelo menos 18 anos
    if (findAge(modDate) < 18) {
      errorCode = 422;
      throw new Error(`Invalid age. You must be over 18 to register.`);
    }

    // Insere as informações no Banco de Dados
    await insertUser(category, id, name, email, modDate);

    // Resposta para o usuário
    res.status(200).send(`${capitalize(category)} registered!`);
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default addUser;
