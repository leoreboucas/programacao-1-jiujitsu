import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IUsuarioTermo } from "../../database/models";
import { usuarioTermos } from "../../database/providers";

interface IBodyProps extends Omit<IUsuarioTermo, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    id_usuario: yup.number().integer().required().moreThan(0),
    data_assinatura: yup.date().required(),
  })),
}));

export const create = async (req: Request<unknown, unknown, IUsuarioTermo>, res: Response) => {
  const result = await usuarioTermos.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  }

  return res.status(StatusCodes.CREATED).json({ id: result });
};
