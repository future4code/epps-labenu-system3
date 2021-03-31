import { Request, Response } from "express";
import insertInfo from "../queries/insertInfo";
import findData from "../queries/findData";
import { createId } from './../functions/createId';

const addHobby = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    // Parâmetros do Body
    const title: string = req.body.title as string;

    // Gera id
    const id: number = await createId("hobby");

    // VALIDAÇÕES
    // Se existe campo vazio ou ausente do body
    if (!title) {
      errorCode = 422;
      throw new Error("'title' is mandatory in body.");
    }

    // Se nome tem menos de 3 caracteres
    if (title.length < 3) {
      errorCode = 422;
      throw new Error("Hobby must be at least 3 characters.");
    }

    // Se o hobby já foi cadastrado
    const findHobby = await findData("hobby", "title", title);
    if (findHobby.length !== 0) {
      errorCode = 409;
      throw new Error(`Hobby '${title}' is already registered!`);
    }

    // Insere as informações no Banco de Dados
    await insertInfo("hobby", id, title);

    // Resposta para o usuário
    res.status(201).send({ message: "Hobby registered!" });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default addHobby;
