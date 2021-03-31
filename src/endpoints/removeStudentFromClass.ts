import { Request, Response } from "express";
import deleteClassAssignment from "../queries/deleteClassAssignment";
import findData from "../queries/findData";
import findDuplicate from "../queries/findDuplicate";

const removeStudentFromClass = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode: number = 400;
  try {
    const { id, classId } = req.params;
    const body = ["id", "classId"];

    // VALIDAÇÕES
    // Se existe campo vazio ou ausente do body
    body.forEach((item) => {
      if (!(item in req.body)) {
        errorCode = 422;
        throw new Error(`'${item}' field is missing.`);
      }
    });

    // Se o usuário existe
    const findStudent = await findData("student", "id", id);
    if (!findStudent) {
      errorCode = 404;
      throw new Error(`Student id '${id}' not found.`);
    }

    // Se a turma existe
    const findClass = await findData("class", "id", classId);
    if (!findClass) {
      errorCode = 404;
      throw new Error(`Class id '${classId}' not found.`);
    }

    //Se a relação existe
    const findRecord = await findDuplicate(
      "techer_class",
      "student_id",
      id,
      "class_id",
      classId
    );
    if (!findRecord) {
      errorCode = 409;
      throw new Error("This student is not assigned to this class!");
    }

    await deleteClassAssignment("student", Number(id), Number(classId));
    res.send({ message: "Student removed from class!" });
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default removeStudentFromClass;
