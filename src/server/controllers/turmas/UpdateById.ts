import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { ITurma } from "../../database/models";
import { StatusCodes } from "http-status-codes";
import { turmas } from "../../database/providers";

interface IParamsProps {
  id?: number;
};

interface IBodyProps extends Omit<ITurma, 'id' | 'created_at' | 'updated_at'> {};

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
      yup.object().shape({
        id_filial: yup
          .number()
          .required()
          .integer()
          .positive(),
  
        nome: yup
          .string()
          .required()
          .min(3),
  
        qtd_alunos: yup
          .number()
          .required()
          .integer()
          .min(0),
  
        max_alunos_permitidos: yup
          .number()
          .required()
          .integer()
          .min(1),
      })
    ),
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamsProps, unknown, IBodyProps>, res: Response) => {
  if (!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado!'
      }
    });
  }

  const result = await turmas.Provider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
}
