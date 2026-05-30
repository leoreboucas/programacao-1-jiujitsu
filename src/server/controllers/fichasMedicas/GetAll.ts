import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { fichasMedicas } from "../../database/providers";
import { validation } from '../../shared/middleware';

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  idPessoa?: number;
  dataAtualFicha?: Date;
  prescricaoMedica?: string;
  outros?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    id: yup.number().integer().optional().default(0),
    idPessoa: yup.number().integer().optional().default(0),
    dataAtualFicha: yup.date().optional(),
    prescricaoMedica: yup.string().optional(),
    outros: yup.string().optional(),
  })),
}));

export const getAll = async (req: Request<unknown, unknown, unknown, IQueryProps>, res: Response) => {
  const result = await fichasMedicas.Provider.getAll(
    req.query.page || 1, req.query.limit || 10, req.query.idPessoa || 0, req.query.dataAtualFicha || null,
    req.query.prescricaoMedica || '', req.query.outros || '', Number(req.query.id));
  const count = await fichasMedicas.Provider.count(Number(req.query.idPessoa));

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
}
