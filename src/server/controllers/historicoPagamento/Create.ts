import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IHistoricoPagamento } from "../../database/models";
import { historicoPagamento } from "../../database/providers";

interface IBodyProps extends Omit<IHistoricoPagamento, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      idTitulo: yup.number().required(),
      dataPagamento: yup.date().required(),
      metodoPagamento: yup.string().required().min(3),
    })
  ),
}));

export const create = async (req: Request<unknown, unknown, IHistoricoPagamento>, res: Response) => {
  const result = await historicoPagamento.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors: {  default: result.message}
    });
  }


  return res.status(StatusCodes.CREATED).json({id_livro:result});
}
