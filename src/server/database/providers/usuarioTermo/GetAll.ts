import { ETableNames } from '../../ETableNames';
import { IUsuarioTermo } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (
  page: number, limit: number, id_usuario: Number, data_assinatura: Date | undefined, id = 0
):Promise<IUsuarioTermo[] | Error> => {
  try {
    const query = Knex(ETableNames.usuarioTermo)
      .select('*');

    if (id > 0) {
      query.where('id', id);
    }

    if (id_usuario) {
      query.where('id_usuario', id_usuario);
    }

    if (data_assinatura) {
      query.where('data_assinatura', data_assinatura);
    }

    const result = await query
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.usuarioTermo)
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
