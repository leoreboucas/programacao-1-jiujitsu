import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { graduacoes } from "../../database/providers";
import { validation } from '../../shared/middleware';

interface IQueryProps {
  id?: number;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    id: yup.number().integer().optional().default(0),
  })),
}));

export const getAll = async (req: Request<unknown, unknown, unknown, IQueryProps>, res: Response) => {

    const id = Number(req.query.id) || 0;

    const [result, count] = await Promise.all([
        graduacoes.Provider.getAll(id),
        graduacoes.Provider.count(id)
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
    res.setHeader('x-total-count', count);
    
    return res.status(StatusCodes.OK).json(result);
};