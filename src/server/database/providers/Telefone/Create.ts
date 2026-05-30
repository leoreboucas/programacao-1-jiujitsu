
import { Knex } from '../../knex';
import { ITelefone } from '../../models';
import { ETableNames } from '../../ETableNames';

export const create = async (telefone: Omit<ITelefone, 'id' | 'createdAt' | 'updatedAt'>): Promise<number | Error> => {
    try {
    const [result] = await Knex(ETableNames.telefone).insert(telefone).returning('id');
  
      console.log({result})

      if (typeof result === 'object') {
        return result.id;
      } else if (typeof result === 'number') {
        return result;
      }
  
      return new Error('Erro ao cadastrar o registro');
    } catch (error) {
      console.log(error);
      return new Error('Erro ao cadastrar o registro');
    }
};
