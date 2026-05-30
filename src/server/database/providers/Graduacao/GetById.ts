import { IGraduacao } from '../../models';
import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';

export const getById = async (id: number): Promise<IGraduacao | Error> => {
  try {
    const result = await Knex(ETableNames.graduacao)
          .select('*')
          .where('id', '=', id)
          .first();
    
        if (result) return result;
    
        return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};