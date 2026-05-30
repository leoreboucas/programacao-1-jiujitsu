import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { filiais } from "../../database/providers";
import { validation } from '../../shared/middleware';


interface IQueryProps {
  id?: number;
  bairro?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    id: yup.number().integer().optional().default(0),
    bairro: yup.string().optional().default(''),
  })),
}));

export const getAll = async (req: Request<unknown, unknown, unknown, IQueryProps>, res: Response) => {
  const id = Number(req.query.id) || 0;
  const bairro = req.query.bairro || ''; 
  
  const [result, count] = await Promise.all([
    filiais.Provider.getAll(id, bairro),
    filiais.Provider.count(id) 
  ]);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  } 
  
  if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message }
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count.toString());

  return res.status(StatusCodes.OK).json(result);
};