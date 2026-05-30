import { IGraduacao } from '../../models';
import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';

export const getAll = async (id = 0): Promise<IGraduacao[] | Error> => {
  try {
    const result = await Knex(ETableNames.graduacao)
          .select('*')
          .where(builder => {
            if (id > 0) builder.where('id', Number(id));
          });
          
    
        if (id > 0 && result.every(item => item.id !== id)) {
          const resultById = await Knex(ETableNames.graduacao)
            .select('*')
            .where('id', '=', id)
            .first();
    
          if (resultById) return [...result, resultById];
        }
    
        return result;

  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};