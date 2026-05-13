import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IFilial } from "../../database/models";
import { filiais } from "../../database/providers";

interface IBodyProps extends Omit<IFilial, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    logradouro: yup.string().required().min(3).max(750),
    bairro: yup.string().required().min(3).max(750),
    numero: yup.string().required().min(3).max(750),
    cep: yup.string().required().min(3).max(750),
    cidade: yup.string().required().min(3).max(750)
  })),
}));

export const create = async (req: Request<unknown, unknown, IFilial>, res: Response) => {
  const result = await filiais.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }


  return res.status(StatusCodes.CREATED).json({id_filial:result});
}
