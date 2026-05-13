import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IFilial } from '../../models';

export const getAll = async (page: number, limit: number, id = 0): Promise<IFilial[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../06_filial.json');
    if (!existsSync(filePath)) return [];

    const fileData = readFileSync(filePath, 'utf-8').trim();
    if (!fileData) return [];

    // 1. Converte o JSON
    const filiais: IFilial[] = JSON.parse(fileData);
    console.log('Total real no array:', filiais.length); 

    const searchId = Number(id);
    const searchLimit = Number(limit) || 10;
    const searchPage = Number(page) || 1;

    // 2. CORREÇÃO DA LÓGICA: Se id for 0, ignora o filtro.
    const filteredResult = searchId === 0 
      ? filiais 
      : filiais.filter(item => Number(item.id) === searchId);

    // 3. Paginação
    const startIndex = (searchPage - 1) * searchLimit;
    const paginatedResult = filteredResult.slice(startIndex, startIndex + searchLimit);

    return paginatedResult.map(item => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at)
    }));

  } catch (error) {
    console.error('Erro no Parse:', error);
    return new Error('Erro ao consultar os registros');
  }
};
