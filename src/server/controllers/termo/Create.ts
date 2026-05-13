import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { ITermo } from "../../database/models";
import { termos } from "../../database/providers";

interface IBodyProps extends Omit<ITermo, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    titulo: yup.string().required().min(3),
    conteudo: yup.string().required(),
    versao: yup.string().required(),
    data_criacao: yup.date().required(),
    data_modificacao: yup.date().required(),
  })),
}));

export const create = async (req: Request<unknown, unknown, ITermo>, res: Response) => {
  const result = await termos.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  }

  return res.status(StatusCodes.CREATED).json({ id: result });
};
