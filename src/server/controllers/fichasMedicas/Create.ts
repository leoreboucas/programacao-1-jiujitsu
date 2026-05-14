import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IFichaMedica } from "../../database/models";
import { fichasMedicas } from "../../database/providers";

interface IBodyProps extends Omit<IFichaMedica, 'id' | 'createdAt' | 'updatedAt'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    idPessoa: yup.number().required(),
    dataAtualFicha: yup.date().required(),
    prescricaoMedica: yup.string().required(),
    outros: yup.string().required(),
  })),
}));

export const create = async (req: Request<unknown, unknown, IFichaMedica>, res: Response) => {
  const result = await fichasMedicas.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json({ id: result });
}