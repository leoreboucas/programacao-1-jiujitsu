import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { ITermo } from "../../database/models";
import { StatusCodes } from "http-status-codes";
import { termos } from "../../database/providers";

interface IParamsProps {
  id?: number;
};

interface IBodyProps extends Omit<ITermo, 'id' | 'created_at' | 'updated_at'> {};

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    titulo: yup.string().required().min(3),
    conteudo: yup.string().required(),
    versao: yup.string().required(),
    data_criacao: yup.date().required(),
    data_modificacao: yup.date().required(),
  })),
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamsProps, unknown, IBodyProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: { default: 'O parâmetro "id" precisa ser informado!' }
    });
  }

  const result = await termos.Provider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
