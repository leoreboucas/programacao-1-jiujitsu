import { ETableNames } from '../../ETableNames';
import { IFichaMedica } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, fichaMedica: Omit<IFichaMedica, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.fichaMedica)
      .update(fichaMedica)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
