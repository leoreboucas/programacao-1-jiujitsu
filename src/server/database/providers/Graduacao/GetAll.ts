import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IGraduacao } from '../../models';

export const getAll = async (page: number, limit: number, titulo: string, id = 0): Promise<IGraduacao[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../03_graduacao.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let graduacoes: IGraduacao[] = [];

    if (fileData.trim() !== '') {
      graduacoes = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchLimit = Number(limit);
    const searchPage = Number(page);

    const filteredResult = id ? graduacoes.filter((item: IGraduacao) => {
      const matchId = Number(item.id) === searchId;

      return matchId;
    }) : graduacoes;

    const startIndex = (searchPage - 1) * searchLimit;
    const endIndex = startIndex + searchLimit;

    let paginatedResult = filteredResult.slice(startIndex, endIndex);

    if (searchId > 0 && paginatedResult.every((item: IGraduacao) => Number(item.id) !== searchId)) {
      const resultById = graduacoes.find((item: IGraduacao) => Number(item.id) === searchId);

      if (resultById) {
        paginatedResult = [...paginatedResult, resultById];
      }
    }

    return paginatedResult.map((item: IGraduacao) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt)
    })) as IGraduacao[];

  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};