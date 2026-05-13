import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IPlano } from '../../models';

export const getAll = async (page: number, limit: number, titulo: string, id = 0): Promise<IPlano[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../12_plano.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let planos: IPlano[] = [];

    if (fileData.trim() !== '') {
      planos = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchLimit = Number(limit);
    const searchPage = Number(page);

    const filteredResult = planos.filter((item: IPlano) => {
      const matchId = Number(item.id) === searchId;
      const matchTitulo = item.titulo.toLowerCase().includes(titulo.toLowerCase());

      return matchId || matchTitulo;
    });

    const startIndex = (searchPage - 1) * searchLimit;
    const endIndex = startIndex + searchLimit;

    let paginatedResult = filteredResult.slice(startIndex, endIndex);

    if (searchId > 0 && paginatedResult.every((item: IPlano) => Number(item.id) !== searchId)) {
      const resultById = planos.find((item: IPlano) => Number(item.id) === searchId);
      if (resultById) {
        paginatedResult = [...paginatedResult, resultById];
      }
    }

    return paginatedResult.map((item: IPlano) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at),
    })) as IPlano[];
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
