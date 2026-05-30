import { Knex } from '../../knex';
import { IPlano } from '../../models';
import { ETableNames } from '../../ETableNames';
 
export const getAll = async (id = 0, titulo = ''): Promise<IPlano[] | Error> => {
    try {
    const query = Knex<IPlano>(ETableNames.plano).select('*');

    if (id > 0) {
      query.where('id', id);
    } else if (titulo) {
      query.where('titulo', 'like', `%${titulo}%`);
    }

    const result = await query;
    console.log({result})
    
    if (id > 0 && !result.some(item => item.id === id)) {
      const resultById = await Knex<IPlano>(ETableNames.plano)
        .select('*')
        .where('id', id)
        .first();
    
      if (resultById) return [...result, resultById];
    }
    
    return result;

        
    } catch (error) {
        console.log(error);
        return new Error('Erro ao buscar os registros');
    }
};
 