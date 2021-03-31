import { Request, Response } from "express";
import findData from "../queries/findData";
import insertUserToClass from "../queries/insertUserToClass";
import findDuplicate from "../queries/findDuplicate";

const addClasstoUser = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    // Parâmetros do Body
    const { category, userId, classId } = req.body;
    const body = ["category", "userId", "classId"];

    // VALIDAÇÕES
    // Se existe campo vazio ou ausente do body
    body.forEach((item) => {
      if (!(item in req.body)) {
        errorCode = 422;
        throw new Error(`'${item}' field is missing.`);
      }
    });

    // Se a categoria é válida
    if (category.toLowerCase() !== "student" && category !== "teacher") {
      errorCode = 422;
      throw new Error(
        `Invalid category. Choose between 'student' or 'teacher'.`
      );
    }

    //Se o id está na base de usuário selecionada
    const findUser = findData(category, "id", userId);
    if (!findUser) {
      errorCode = 404;
      throw new Error(`User id ${userId} not found.`);
    }

    //Se o id está na base de turmas
    const findClass = findData(category, "id", classId);
    if (!findClass) {
      errorCode = 404;
      throw new Error(`Class id ${userId} not found.`);
    }

    //Se a relaçao usuário-turma já foi cadastrada
    const findRecord = await findDuplicate(
      `${category}_class`,
      `${category}_id`,
      userId,
      "class_id",
      classId
    );
    if (findRecord) {
      errorCode = 409;
      throw new Error(`This register has already been made.`);
    }

    //Insere as informações no Banco de Dados
    await insertUserToClass(category, userId, classId);

    //Resposta para o usuário
    res.send({ message: "Success!" });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default addClasstoUser;
