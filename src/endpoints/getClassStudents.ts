import { Request, Response } from "express";
import getUserByClass from "../queries/getUserByClass";

const getClassStudents = async (req: Request, res: Response): Promise<void> => {
  let errorCode: number = 400;
  try {
    // Parâmetros do query
    const className = req.params.className as string;

    // Requisição do banco de dados
    const resp = await getUserByClass("student", className);

    // Tratando as informações que devolverá ao usuário
    const students = resp.map((student: any): any => {
      return { name: student.name };
    });

    // Resposta para o usuário
    res.send({ students: students });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default getClassStudents;
