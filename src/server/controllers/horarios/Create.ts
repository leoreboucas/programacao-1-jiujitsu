import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { IHorario } from "../../database/models";
import { horarios } from "../../database/providers";

interface IBodyProps extends Omit<IHorario, 'id' | 'created_at' | 'updated_at'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      dia: yup
        .string()
        .required()
        .min(3),

      hora: yup
        .string()
        .required()
        .matches(
          /^([01]\d|2[0-3]):([0-5]\d)$/,
          'Formato inválido. Use HH:mm'
        ),
    })
  ),
}));

export const create = async (req: Request<unknown, unknown, IHorario>, res: Response) => {
  const result = await horarios.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }


  return res.status(StatusCodes.CREATED).json({id_horario:result});
}
