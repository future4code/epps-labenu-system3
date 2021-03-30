import { Request, Response } from "express";

const endpoint_template = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode: number = 400;
  try {
    // const resp = await queryFunction(param)
    // res.send(resp)
  } catch (error) {
    res.status(errorCode).send({ message: error.message || error.sqlMessage });
  }
};

export default endpoint_template;
