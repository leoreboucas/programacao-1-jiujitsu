import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { categorias } from "../../database/providers";
import { validation } from '../../shared/middleware';

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  nome?: string;
  faixa_etaria?: string;
  faixa_peso?: string;
  faixa?: string;
  descricao?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    id: yup.number().integer().optional().default(0),
    nome: yup.string().optional(),
    faixa_etaria: yup.string().optional(),
    faixa_peso: yup.string().optional(),
    faixa: yup.string().optional(),
    descricao: yup.string().optional(),
  })),
}));

export const getAll = async (req: Request<unknown, unknown, unknown, IQueryProps>, res: Response) => {
  const result = await categorias.Provider.getAll(
    req.query.page || 1, req.query.limit || 10, req.query.nome || '', req.query.faixa_etaria || '',
    req.query.faixa_peso || '', req.query.faixa || '', req.query.descricao || '', Number(req.query.id));
  const count = await categorias.Provider.count(req.query.nome || '');

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
