import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { ICategoria } from "../../database/models";
import { categorias } from "../../database/providers";

interface IBodyProps extends Omit<ICategoria, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    faixa_etaria: yup.string().required(),
    faixa_peso: yup.string().required(),
    faixa: yup.string().required(),
    descricao: yup.string().required(),
  })),
}));

export const create = async (req: Request<unknown, unknown, ICategoria>, res: Response) => {
  const result = await categorias.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  }

  return res.status(StatusCodes.CREATED).json({ id: result });
};
