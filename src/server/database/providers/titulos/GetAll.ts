import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { ITitulo } from '../../models';

export const getAll = async (page: number, limit: number, titulo: string, id = 0): Promise<ITitulo[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../18_titulos.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let titulos: ITitulo[] = [];

    if (fileData.trim() !== '') {
      titulos = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchLimit = Number(limit);
    const searchPage = Number(page);

    const filteredResult = titulos.filter((item: ITitulo) => {
      const matchId = Number(item.id) === searchId;
      const matchTitulo = item.titulo.toLowerCase().includes(titulo.toLowerCase());

      return matchId || matchTitulo;
    });

    const startIndex = (searchPage - 1) * searchLimit;
    const endIndex = startIndex + searchLimit;

    let paginatedResult = filteredResult.slice(startIndex, endIndex);

    if (searchId > 0 && paginatedResult.every((item: ITitulo) => Number(item.id) !== searchId)) {
      const resultById = titulos.find((item: ITitulo) => Number(item.id) === searchId);

      if (resultById) {
        paginatedResult = [...paginatedResult, resultById];
      }
    }

    return paginatedResult.map((item: ITitulo) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at)
    })) as ITitulo[];

  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
