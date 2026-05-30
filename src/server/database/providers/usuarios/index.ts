import * as GetByEmail from './GetByEmail';
import * as GetById from './GetById';
import * as Create from './Create';
import * as UpdateById from './UpdateById';
import * as DeleteById from './DeleteById';


export const Provider = {
  ...GetByEmail,
  ...GetById,
  ...Create,
  ...UpdateById,
  ...DeleteById,
};
