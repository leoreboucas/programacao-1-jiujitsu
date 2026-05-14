import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IPessoa } from "../../database/models";
import { pessoas } from "../../database/providers";

interface IBodyProps extends Omit<IPessoa, 'id' | 'createdAt' | 'updatedAt'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required(),
    sobrenome: yup.string().required(),
    peso: yup.number().required(),
    dataNascimento: yup.date().required(),
    dataMatricula: yup.date().required(),
  })),
}));

export const create = async (req: Request<unknown, unknown, IPessoa>, res: Response) => {
  console.log('cont', req.body)
  const result = await pessoas.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json({ id: result });
}