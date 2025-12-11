import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

class ValidationErrors {
  public service: Function;
  constructor() {
    this.service = validationResult;
  }
}

const validateFields = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errorsLength: errors.array().length,
      error: errors.array()[0].msg,
    });
  }
  next();
};

export default validateFields;
