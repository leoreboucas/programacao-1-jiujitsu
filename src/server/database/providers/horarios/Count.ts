import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const count = async (dia = '', hora = ''): Promise<number | Error> => {
  try {
    const query = Knex(ETableNames.horario);

    if (dia) query.where('dia', 'like', `%${dia}%`);
    if (hora) query.where('hora', 'like', `%${hora}%`);

    const [{ count }] = await query.count<[{ count: number }]>('* as count');

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error('Erro ao consultar a quantidade total de registros');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
