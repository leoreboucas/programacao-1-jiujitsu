import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { horarios } from '../../database/providers';
import { validation } from '../../shared/middleware';

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  dia?: string;
  hora?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().optional().moreThan(0),
      limit: yup.number().optional().moreThan(0),
      id: yup.number().integer().optional().default(0),
      dia: yup.string().optional(),
      hora: yup
        .string()
        .optional()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato invalido. Use HH:mm'),
    })
  ),
}));

export const getAll = async (
  req: Request<unknown, unknown, unknown, IQueryProps>,
  res: Response
) => {
  const queryId = req.query.id ? Number(req.query.id) : 0;

  const result = await horarios.Provider.getAll(
    Number(req.query.page) || 1,
    Number(req.query.limit) || 10,
    req.query.dia || '',
    req.query.hora || '',
    queryId
  );

  const count = await horarios.Provider.count(req.query.dia || '', req.query.hora || '');

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message },
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);

  return res.status(StatusCodes.OK).json(result);
};
