import { ETableNames } from '../../ETableNames';
import { ITurma } from '../../models';
import { Knex } from '../../knex';

export const getAll = async (page: number, limit: number, nome: string, id = 0): Promise<ITurma[] | Error> => {
  try {
    const query = Knex(ETableNames.turma).select('*');

    if (Number(id) > 0) query.where('id', '=', Number(id));
    if (nome) query.where('nome', 'like', `%${nome}%`);

    const result = await query
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
