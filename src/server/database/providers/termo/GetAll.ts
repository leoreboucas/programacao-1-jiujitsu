import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { ITermo } from '../../models';

export const getAll = async (page: number, limit: number, titulo: string, id = 0): Promise<ITermo[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../16_termo.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let termos: ITermo[] = [];

    if (fileData.trim() !== '') {
      termos = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchLimit = Number(limit);
    const searchPage = Number(page);

    const filteredResult = termos.filter((item: ITermo) => {
      const matchId = Number(item.id) === searchId;
      const matchTitulo = item.titulo.toLowerCase().includes(titulo.toLowerCase());

      return matchId || matchTitulo;
    });

    const startIndex = (searchPage - 1) * searchLimit;
    const endIndex = startIndex + searchLimit;

    let paginatedResult = filteredResult.slice(startIndex, endIndex);

    if (searchId > 0 && paginatedResult.every((item: ITermo) => Number(item.id) !== searchId)) {
      const resultById = termos.find((item: ITermo) => Number(item.id) === searchId);
      if (resultById) {
        paginatedResult = [...paginatedResult, resultById];
      }
    }

    return paginatedResult.map((item: ITermo) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at),
    })) as ITermo[];
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
