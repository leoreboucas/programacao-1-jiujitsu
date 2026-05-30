import { ETableNames } from '../../ETableNames';
import { ITurma } from '../../models';
import { Knex } from '../../knex';

export const updateById = async (id: number, turma: Omit<ITurma, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.turma)
      .update(turma)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
