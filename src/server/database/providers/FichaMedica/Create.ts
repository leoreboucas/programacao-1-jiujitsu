import { ETableNames } from '../../ETableNames';
import { IFichaMedica } from '../../models';
import { Knex } from '../../knex';


export const create = async (fichaMedica: Omit<IFichaMedica, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.fichaMedica).insert(fichaMedica).returning('id');

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
