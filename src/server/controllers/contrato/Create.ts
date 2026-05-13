import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IContrato } from "../../database/models";
import { contratos } from "../../database/providers";

interface IBodyProps extends Omit<IContrato, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    id_usuario: yup.number().integer().required().moreThan(0),
    id_plano: yup.number().integer().required().moreThan(0),
    data_adesao: yup.date().required(),
    data_fim_contrato: yup.date().required(),
  })),
}));

export const create = async (req: Request<unknown, unknown, IContrato>, res: Response) => {
  const result = await contratos.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  }

  return res.status(StatusCodes.CREATED).json({ id: result });
};
