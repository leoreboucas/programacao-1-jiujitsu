import { ETableNames } from '../../ETableNames';
import { ICategoria } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (
  page: number, limit: number, nome: string, faixa_etaria: string, faixa_peso: string, faixa: string, descricao: string, id = 0
):Promise<ICategoria[] | Error> => {
  try {
    const result = await Knex(ETableNames.categoria)
      .select('*')
      .where('id', Number(id))
      .orWhere('nome', 'like', `%${nome}%`)
      .orWhere('faixa_etaria', 'like', `%${faixa_etaria}%`)
      .orWhere('faixa_peso', 'like', `%${faixa_peso}%`)
      .orWhere('faixa', 'like', `%${faixa}%`)
      .orWhere('descricao', 'like', `%${descricao}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.categoria)
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
