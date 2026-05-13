import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { ITurma } from "../../database/models";
import { turmas } from "../../database/providers";

interface IBodyProps extends Omit<ITurma, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      id_filial: yup
        .number()
        .required()
        .integer()
        .positive(),

      nome: yup
        .string()
        .required()
        .min(3),

      qtd_alunos: yup
        .number()
        .required()
        .integer()
        .min(0),

      max_alunos_permitidos: yup
        .number()
        .required()
        .integer()
        .min(1),
    })
  ),
}));

export const create = async (req: Request<unknown, unknown, ITurma>, res: Response) => {
  const result = await turmas.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }


  return res.status(StatusCodes.CREATED).json({id_turma:result});
}
