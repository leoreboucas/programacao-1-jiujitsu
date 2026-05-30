import * as deleteById from './DeleteById';
import * as updateById from './UpdateById';
import * as create from './Create';
import * as count from './Count';
import * as getAll from './GetAll';
import * as getById from './GetById';


export const Provider = {
  ...deleteById,
  ...updateById,
  ...create,
  ...getAll,
  ...getById,
  ...count,
};
