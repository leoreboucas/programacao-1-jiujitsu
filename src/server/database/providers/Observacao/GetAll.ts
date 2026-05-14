import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IObservacao } from '../../models';

export const getAll = async (page: number, limit: number, titulo: string, id = 0): Promise<IObservacao[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../02_observacao.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let observacoes: IObservacao[] = [];

    if (fileData.trim() !== '') {
      observacoes = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchLimit = Number(limit);
    const searchPage = Number(page);

    const filteredResult = id ? observacoes.filter((item: IObservacao) => {
      const matchId = Number(item.id) === searchId;

      return matchId;
    }) : observacoes;

    const startIndex = (searchPage - 1) * searchLimit;
    const endIndex = startIndex + searchLimit;

    let paginatedResult = filteredResult.slice(startIndex, endIndex);

    if (searchId > 0 && paginatedResult.every((item: IObservacao) => Number(item.id) !== searchId)) {
      const resultById = observacoes.find((item: IObservacao) => Number(item.id) === searchId);

      if (resultById) {
        paginatedResult = [...paginatedResult, resultById];
      }
    }

    return paginatedResult.map((item: IObservacao) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt)
    })) as IObservacao[];

  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};