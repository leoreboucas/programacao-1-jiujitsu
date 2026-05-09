import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IUsuario } from "../../database/models";
import { usuarios } from "../../database/providers";

interface IBodyProps extends Omit<IUsuario, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    idPessoa: yup.number().required(),
    email: yup.string().required().min(3),
    senha: yup.string().required().min(3),
    comissaoPorAluno: yup.number().required(),
  })),
}));

export const create = async (req: Request<unknown, unknown, IUsuario>, res: Response) => {
  const result = await usuarios.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }


  return res.status(StatusCodes.CREATED).json({id_livro:result});
}
