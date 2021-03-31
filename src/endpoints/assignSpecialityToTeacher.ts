import { Request, Response } from "express";
import findData from "../queries/findData";
import findDuplicate from "../queries/findDuplicate";
import insertSpecialityToTeacher from "../queries/insertSpecialityToTeacher";
import { relationBody, relationType } from "../types/relationBody";

const assignSpecialityToTeacher = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode: number = 400;
  try {
    const { userId, infoId } = req.body as relationType;

    // VALIDAÇÕES
    // Se existe campo vazio ou ausente do body
    for (let item in relationBody) {
      if (!(item in req.body)) {
        errorCode = 422;
        throw new Error(`'${item}' field is missing.`);
      }
    }

    // Se o usuário existe
    const findUser = findData("teacher", "id", userId);
    if (!findUser) {
      errorCode = 404;
      throw new Error(`Teacher id '${userId}' not found.`);
    }

    // Se o info existe
    const findInfo = findData("teacher", "id", infoId);
    if (!findInfo) {
      errorCode = 404;
      throw new Error(`Speciality id '${infoId}' not found.`);
    }

    //Se o regsitro já foi realizado
    const findRecord = findDuplicate(
      "teacher",
      "teacher_id",
      userId,
      "speciality_id",
      infoId
    );
    if (findRecord) {
      errorCode = 409;
      throw new Error("This assignment has already been made!");
    }

    // Insere as informações no Banco de Dados
    await insertSpecialityToTeacher(userId, infoId);

    // Resposta para o usuário
    res.status(201).send({ message: "Success!" });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default assignSpecialityToTeacher;
