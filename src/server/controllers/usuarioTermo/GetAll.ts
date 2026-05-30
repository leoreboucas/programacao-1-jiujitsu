import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { usuarioTermos } from "../../database/providers";
import { validation } from '../../shared/middleware';

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  id_usuario?: number;
  data_assinatura?: Date;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    id: yup.number().integer().optional().default(0),
    id_usuario: yup.number().integer().optional().default(0),
    data_assinatura: yup.date().optional(),
  })),
}));

export const getAll = async (req: Request<unknown, unknown, unknown, IQueryProps>, res: Response) => {
  const result = await usuarioTermos.Provider.getAll(
    req.query.page || 1, req.query.limit || 10, Number(req.query.id_usuario), req.query.data_assinatura || undefined, Number(req.query.id));
  const count = await usuarioTermos.Provider.count(Number(req.query.id_usuario));

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message }
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);

  return res.status(StatusCodes.OK).json(result);
};
