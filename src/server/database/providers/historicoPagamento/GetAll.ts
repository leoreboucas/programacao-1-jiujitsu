import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IHistoricoPagamento } from '../../models';

export const getAll = async (page: number, limit: number, id = 0): Promise<IHistoricoPagamento[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../18_historicoPagamento.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let historicoPagamento: IHistoricoPagamento[] = [];

    if (fileData.trim() !== '') {
      historicoPagamento = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchLimit = Number(limit);
    const searchPage = Number(page);

    const filteredResult = historicoPagamento.filter((item: IHistoricoPagamento) => {
      const matchId = Number(item.id) === searchId || Number.isNaN(searchId);

      return matchId;
    });

    const startIndex = (searchPage - 1) * searchLimit;
    const endIndex = startIndex + searchLimit;

    let paginatedResult = filteredResult.slice(startIndex, endIndex);

    if (searchId > 0 && paginatedResult.every((item: IHistoricoPagamento) => Number(item.id) !== searchId)) {
      const resultById = historicoPagamento.find((item: IHistoricoPagamento) => Number(item.id) === searchId);

      if (resultById) {
        paginatedResult = [...paginatedResult, resultById];
      }
    }

    return paginatedResult.map((item: IHistoricoPagamento) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at)
    })) as IHistoricoPagamento[];

  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
