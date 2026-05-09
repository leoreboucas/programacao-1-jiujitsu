import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { ITitulo } from "../../database/models";
import { titulos } from "../../database/providers";

interface IBodyProps extends Omit<ITitulo, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    idUsuario: yup.number().required(),
    titulo: yup.string().required().min(3),
    dataVencimento: yup.date().required(),
    dataTitulo: yup.date().required(),
    tipo: yup.string().required().min(3),
    status: yup.string().required().min(3),
  })),
}));

export const create = async (req: Request<unknown, unknown, ITitulo>, res: Response) => {
  const result = await titulos.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors: {  default: result.message}
    });
  }


  return res.status(StatusCodes.CREATED).json({id_livro:result});
}
