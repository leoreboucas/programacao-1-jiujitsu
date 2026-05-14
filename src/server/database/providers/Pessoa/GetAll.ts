import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IPessoa } from '../../models';

export const getAll = async (page: number, limit: number, titulo: string, id = 0): Promise<IPessoa[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../01_pessoa.json');
    
    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let pessoas: IPessoa[] = [];
    if (fileData.trim() !== '') {
      pessoas = JSON.parse(fileData);
    }
    
    const searchId = Number(id);
    const searchLimit = Number(limit);
    const searchPage = Number(page);

    const filteredResult = id ? pessoas.filter((item: IPessoa) => {
      const matchId = Number(item.id) === searchId;

      return matchId;
    }) : pessoas;

    const startIndex = (searchPage - 1) * searchLimit;
    const endIndex = startIndex + searchLimit;

    let paginatedResult = filteredResult.slice(startIndex, endIndex);

    if (searchId > 0 && paginatedResult.every((item: IPessoa) => Number(item.id) !== searchId)) {
      const resultById = pessoas.find((item: IPessoa) => Number(item.id) === searchId);

      if (resultById) {
        paginatedResult = [...paginatedResult, resultById];
      }
    }
    console.log({paginatedResult})
    return paginatedResult.map((item: IPessoa) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt)
    })) as IPessoa[];

  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};