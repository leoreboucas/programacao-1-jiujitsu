import { Knex } from '../../knex';
import { ITelefone } from '../../models';
import { ETableNames } from '../../ETableNames';
 
export const getAll = async (id = 0, numero = ''): Promise<ITelefone[] | Error> => {
    try {
    const query = Knex<ITelefone>(ETableNames.telefone).select('*');

    if (id > 0) {
      query.where('id', id);
    } else if (numero) {
      query.where('numero', 'like', `%${numero}%`);
    }

    const result = await query;
    console.log({result})
    
    if (id > 0 && !result.some(item => item.id === id)) {
      const resultById = await Knex<ITelefone>(ETableNames.telefone)
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
 