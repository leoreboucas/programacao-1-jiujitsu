
import { Knex } from '../../knex';
import { IPlano } from '../../models';
import { ETableNames } from '../../ETableNames';

export const create = async (plano: Omit<IPlano, 'id' | 'createdAt' | 'updatedAt'>): Promise<number | Error> => {
    try {
    const [result] = await Knex(ETableNames.plano).insert(plano).returning('id');
  
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
