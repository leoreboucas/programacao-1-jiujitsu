import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { ITurma } from '../../models';

export const getAll = async (page: number, limit: number, nome: string, id = 0): Promise<ITurma[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../07_turma.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let turmas: ITurma[] = [];

    if (fileData.trim() !== '') {
      turmas = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchLimit = Number(limit);
    const searchPage = Number(page);

    const filteredResult = turmas.filter((item: ITurma) => {
      const matchId = Number(item.id) === searchId;
      const matchNome = item.nome.toLowerCase().includes(nome.toLowerCase());

      return matchId || matchNome;
    });

    const startIndex = (searchPage - 1) * searchLimit;
    const endIndex = startIndex + searchLimit;

    let paginatedResult = filteredResult.slice(startIndex, endIndex);

    if (searchId > 0 && paginatedResult.every((item: ITurma) => Number(item.id) !== searchId)) {
      const resultById = turmas.find((item: ITurma) => Number(item.id) === searchId);

      if (resultById) {
        paginatedResult = [...paginatedResult, resultById];
      }
    }

    return paginatedResult.map((item: ITurma) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at)
    })) as ITurma[];

  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
