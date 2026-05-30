import { ETableNames } from '../../ETableNames';
import { IHorario } from '../../models';
import { Knex } from '../../knex';

export const getAll = async (page: number, limit: number, dia: string, hora: string, id = 0): Promise<IHorario[] | Error> => {
  try {
    const query = Knex(ETableNames.horario).select('*');

    if (Number(id) > 0) query.where('id', '=', Number(id));
    if (dia) query.where('dia', 'like', `%${dia}%`);
    if (hora) query.where('hora', 'like', `%${hora}%`);

    const result = await query
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
