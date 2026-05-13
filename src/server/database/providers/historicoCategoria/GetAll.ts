import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IHistoricoCategoria } from '../../models';

export const getAll = async (page: number, limit: number, id_usuario = 0, id = 0): Promise<IHistoricoCategoria[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../14_historico_categoria.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let historicos: IHistoricoCategoria[] = [];

    if (fileData.trim() !== '') {
      historicos = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchIdUsuario = Number(id_usuario);
    const searchLimit = Number(limit);
    const searchPage = Number(page);

    const filteredResult = historicos.filter((item: IHistoricoCategoria) => {
      const matchId = Number(item.id) === searchId;
      const matchIdUsuario = searchIdUsuario > 0 ? Number(item.id_usuario) === searchIdUsuario : true;

      return matchId || matchIdUsuario;
    });

    const startIndex = (searchPage - 1) * searchLimit;
    const endIndex = startIndex + searchLimit;

    let paginatedResult = filteredResult.slice(startIndex, endIndex);

    if (searchId > 0 && paginatedResult.every((item: IHistoricoCategoria) => Number(item.id) !== searchId)) {
      const resultById = historicos.find((item: IHistoricoCategoria) => Number(item.id) === searchId);
      if (resultById) {
        paginatedResult = [...paginatedResult, resultById];
      }
    }

    return paginatedResult.map((item: IHistoricoCategoria) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at),
    })) as IHistoricoCategoria[];
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
