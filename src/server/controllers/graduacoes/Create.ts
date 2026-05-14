import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IGraduacao } from "../../database/models";
import { graduacoes } from "../../database/providers";

interface IBodyProps extends Omit<IGraduacao, 'id' | 'createdAt' | 'updatedAt'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required(),
    sobrenome: yup.string().required(),
    peso: yup.number().required(),
    dataNascimento: yup.date().required(),
    dataMatricula: yup.date().required(),
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