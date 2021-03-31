import { Request, Response } from "express";
import editClassModule from "../queries/editClassModule";
import findData from "../queries/findData";

const changeClassModule = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode: number = 400;
  try {
    const { id, module } = req.body;
    const body = ["id", "module"];

    // VALIDAÇÕES
    // Se existe campo vazio ou ausente do body
    body.forEach((item) => {
      if (!(item in req.body)) {
        errorCode = 422;
        throw new Error(`'${item}' field is missing.`);
      }
    });

    // Se a turma existe
    const findClass = await findData("class", "id", id);
    if (!findClass) {
      errorCode = 404;
      throw new Error(`Class id '${module}' not found.`);
    }

    // Edita informação
    await editClassModule(id, module);

    // Resposta para o usuário
    res.send({ message: "Class successfully modified!" });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default changeClassModule;
