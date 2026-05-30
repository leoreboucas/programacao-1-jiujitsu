import * as getAll from './GetAll';
import * as create from './Create';
import * as updateById from './UpdateById';
import * as deleteByID from './DeleteById';
import * as getById from './GetById';

export const Controller = {
  ...getAll,
  ...create,
  ...updateById,
  ...getById,
  ...deleteByID,
}


