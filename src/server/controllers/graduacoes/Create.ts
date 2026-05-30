import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IGraduacao } from "../../database/models";
import { graduacoes } from "../../database/providers";

interface IBodyProps extends Omit<IGraduacao, 'id' | 'createdAt' | 'updatedAt'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    id_aluno: yup.number().integer().required().moreThan(0),
    tipo: yup.string().required(),
    faixa_atual: yup.string().required(),
    grau_atual: yup.string().required(),
    createdAt: yup.date().optional(),
    updatedAt: yup.date().optional(),
  })),
}));

export const create = async (req: Request<unknown, unknown, IGraduacao>, res: Response) => {
  const result = await graduacoes.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json({ id: result });
}
