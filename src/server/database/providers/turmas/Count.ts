import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const count = async (nome = ''): Promise<number | Error> => {
  try {
    const query = Knex(ETableNames.turma);

    if (nome) query.where('nome', 'like', `%${nome}%`);

    const [{ count }] = await query.count<[{ count: number }]>('* as count');

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error('Erro ao consultar a quantidade total de registros');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
