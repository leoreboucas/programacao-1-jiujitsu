import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IPlano } from "../../database/models";
import { planos } from "../../database/providers";

interface IBodyProps extends Omit<IPlano, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    periodo: yup.string().required(),
    titulo: yup.string().required().min(3),
    descricao: yup.string().required(),
    valor: yup.number().required().moreThan(0),
    data_atualizacao: yup.date().required(),
  })),
}));

export const create = async (req: Request<unknown, unknown, IPlano>, res: Response) => {
  const result = await planos.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  }

  return res.status(StatusCodes.CREATED).json({ id: result });
};
