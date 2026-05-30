import { IGraduacao } from '../../models';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const updateById = async (id: number, graduacao: Omit<IGraduacao, 'id' | 'createdAt' | 'updatedAt'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.graduacao)
          .update(graduacao)
          .where('id', '=', id);
    
        if (result > 0) return;
    
        return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};