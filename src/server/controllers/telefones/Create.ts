import { Request, Response } from "express";
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from "http-status-codes";
import { ITelefone } from "../../database/models";
import { telefones } from "../../database/providers";

interface IBodyProps extends Omit<ITelefone, 'id' | 'createdAt' | 'updatedAt'> {};

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({    
    idPessoa:  yup.number().required(),
    numero:  yup.string().required()
  })),
}));

export const create = async (req: Request<unknown, unknown, ITelefone>, res: Response) => {
  const result = await telefones.Provider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }


  return res.status(StatusCodes.CREATED).json({id:result});
}
