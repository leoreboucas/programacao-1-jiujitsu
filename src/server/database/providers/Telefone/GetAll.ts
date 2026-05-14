import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { ITelefone } from '../../models';

export const getAll = async (page: number, limit: number, id = 0): Promise<ITelefone[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../00_telefones.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let telefones: ITelefone[] = [];

    if (fileData.trim() !== '') {
      telefones = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchLimit = Number(limit);
    const searchPage = Number(page);

    const filteredResult = id ? telefones.filter((item: ITelefone) => {
      const matchId = Number(item.id) === searchId;

      return matchId;
    }) : telefones;

    const startIndex = (searchPage - 1) * searchLimit;
    const endIndex = startIndex + searchLimit;

    let paginatedResult = filteredResult.slice(startIndex, endIndex);

    if (searchId > 0 && paginatedResult.every((item: ITelefone) => Number(item.id) !== searchId)) {
      const resultById = telefones.find((item: ITelefone) => Number(item.id) === searchId);

      if (resultById) {
        paginatedResult = [...paginatedResult, resultById];
      }
    }

    return paginatedResult.map((item: ITelefone) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt)
    })) as ITelefone[];

  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
