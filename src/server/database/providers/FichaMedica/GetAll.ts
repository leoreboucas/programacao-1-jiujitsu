import { ETableNames } from '../../ETableNames';
import { IFichaMedica } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (
  page: number, limit: number, id_pessoa: number, data_atual_ficha: Date | null, prescricao_medica: string, outros: string, id = 0
):Promise<IFichaMedica[] | Error> => {
  try {
    const result = await Knex(ETableNames.fichaMedica)
      .select('*')
      .where('id', Number(id))
      .orWhere('id_pessoa', '=', id_pessoa)
      .orWhere('data_atual_ficha', '=', data_atual_ficha)
      .orWhere('prescricao_medica', 'like', `%${prescricao_medica}%`)
      .orWhere('outros', 'like', `%${outros}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.fichaMedica)
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
