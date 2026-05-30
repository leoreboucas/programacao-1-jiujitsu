import { ETableNames } from '../../ETableNames';
import { ITurma } from '../../models';
import { Knex } from '../../knex';

export const getById = async (id: number): Promise<ITurma | Error> => {
  try {
    const result = await Knex(ETableNames.turma)
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
