import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IUsuarioTurma } from "../../database/models";
import { usuariosTurmas } from "../../database/providers";

interface IBodyProps extends Omit<IUsuarioTurma, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    id_usuario: yup.number().required().integer().positive(),
    id_turma: yup.number().required().integer().positive(),
  })),
}));

export const create = async (req: Request<unknown, unknown, IBodyProps>, res: Response) => {
  const result = await usuariosTurmas.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  }

  return res.status(StatusCodes.CREATED).json({id_usuario_turma: result});
}
