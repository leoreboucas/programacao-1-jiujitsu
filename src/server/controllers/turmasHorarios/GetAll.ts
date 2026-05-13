import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { turmasHorarios } from "../../database/providers";
import { validation } from '../../shared/middleware';

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  id_turma?: number;
  id_horario?: number;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    id: yup.number().integer().optional().default(0),
    id_turma: yup.number().integer().optional().default(0),
    id_horario: yup.number().integer().optional().default(0),
  })),
}));

export const getAll = async (req: Request<unknown, unknown, unknown, IQueryProps>, res: Response) => {
  const result = await turmasHorarios.Provider.getAll(
    Number(req.query.page) || 1,
    Number(req.query.limit) || 10,
    Number(req.query.id) || 0,
    Number(req.query.id_turma) || 0,
    Number(req.query.id_horario) || 0
  );
  const count = await turmasHorarios.Provider.count(String(req.query.id || ''));

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
