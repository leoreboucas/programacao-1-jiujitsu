import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IObservacao } from "../../database/models";
import { observacoes } from "../../database/providers";

interface IBodyProps extends Omit<IObservacao, 'id' | 'createdAt' | 'updatedAt'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    idUsuario: yup.number().required(),
    idInstrutor: yup.number().required(),
    dataObservacao: yup.date().required(),
    descricao: yup.string().required(),
  })),
}));

export const create = async (req: Request<unknown, unknown, IObservacao>, res: Response) => {
  const result = await observacoes.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json({ id: result });
}