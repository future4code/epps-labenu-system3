import { Request, Response } from "express";
import getUserByClass from "../queries/getUserByClass";

const getClassTeachers = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    // Parâmetros do query
    const className = req.query.className as string;

    // Requisição do banco de dados
    const resp = await getUserByClass("teacher", className);

    // Tratando as informações que devolverá ao usuário
    const teachers = resp.map((teacher: any): any => {
      return { name: teacher.name };
    });

    // Resposta para o usuário
    res.send({ teachers: teachers });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default getClassTeachers;
