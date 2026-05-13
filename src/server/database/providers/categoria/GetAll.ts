import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { ICategoria } from '../../models';

export const getAll = async (page: number, limit: number, nome: string, id = 0): Promise<ICategoria[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../15_categoria.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let categorias: ICategoria[] = [];

    if (fileData.trim() !== '') {
      categorias = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchLimit = Number(limit);
    const searchPage = Number(page);

    const filteredResult = categorias.filter((item: ICategoria) => {
      const matchId = Number(item.id) === searchId;
      const matchNome = item.nome.toLowerCase().includes(nome.toLowerCase());

      return matchId || matchNome;
    });

    const startIndex = (searchPage - 1) * searchLimit;
    const endIndex = startIndex + searchLimit;

    let paginatedResult = filteredResult.slice(startIndex, endIndex);

    if (searchId > 0 && paginatedResult.every((item: ICategoria) => Number(item.id) !== searchId)) {
      const resultById = categorias.find((item: ICategoria) => Number(item.id) === searchId);
      if (resultById) {
        paginatedResult = [...paginatedResult, resultById];
      }
    }

    return paginatedResult.map((item: ICategoria) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at),
    })) as ICategoria[];
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
