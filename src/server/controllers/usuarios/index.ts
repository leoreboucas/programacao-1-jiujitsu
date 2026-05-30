import * as GetByEmail from './GetByEmail';
import * as getById from './GetById';
import * as create from './Create';
import * as updateById from './UpdateById';
import * as deleteByID from './DeleteById';

export const Controller = {
  ...GetByEmail,
  ...getById,
  ...create,
  ...updateById,
  ...deleteByID,
}


