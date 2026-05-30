import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { usuarios } from "../../database/providers";

interface IParamsProps {
  email?: string;
};

export const getByEmailValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    email: yup.string().email().required(),
  })),
}));

export const getByEmail = async (req: Request<IParamsProps>, res: Response) => {
  if (!req.params.email){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "email" precisa ser informado!'
      }
    });
  }

  const result = await usuarios.Provider.getByEmail(req.params.email);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);
}
