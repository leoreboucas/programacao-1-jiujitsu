import { IFilial } from '../../models';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const getAll = async (id = 0, bairro = ''): Promise<IFilial[] | Error> => {
  try {
    const query = Knex<IFilial>(ETableNames.filial).select('*');

    if (id > 0) {
      query.where('id', id);
    } else if (bairro) {
      query.where('bairro', 'like', `%${bairro}%`);
    }

    const result = await query;
    
    if (id > 0 && !result.some(item => item.id === id)) {
      const resultById = await Knex<IFilial>(ETableNames.filial)
        .select('*')
        .where('id', id)
        .first();
    
      if (resultById) return [...result, resultById];
    }
    
    return result;

  } catch (error) {
    console.error('Erro no Parse:', error);
    return new Error('Erro ao consultar os registros');
  }
};

