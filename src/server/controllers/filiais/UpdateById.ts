import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { IFilial } from "../../database/models";
import { StatusCodes } from "http-status-codes";
import { filiais } from "../../database/providers";

interface IParamsProps {
  id?: number;
};

interface IBodyProps extends Omit<IFilial, 'id' | 'created_at' | 'updated_at'> {};

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    logradouro: yup.string().required().min(3).max(750),
    bairro: yup.string().required().min(3).max(750),
    numero: yup.string().required().min(3).max(750),
    cep: yup.string().required().min(3).max(750),
    cidade: yup.string().required().min(3).max(750)
  })),
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
  if (!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado!'
      }
    });
  }

  const result = await filiais.Provider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
}
