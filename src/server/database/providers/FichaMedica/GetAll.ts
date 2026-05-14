import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IFichaMedica } from '../../models';

export const getAll = async (page: number, limit: number, titulo: string, id = 0): Promise<IFichaMedica[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../04_fichaMedica.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let fichasMedicas: IFichaMedica[] = [];

    if (fileData.trim() !== '') {
      fichasMedicas = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchLimit = Number(limit);
    const searchPage = Number(page);

    const filteredResult = id ? fichasMedicas.filter((item: IFichaMedica) => {
      const matchId = Number(item.id) === searchId;

      return matchId;
    }) : fichasMedicas;

    const startIndex = (searchPage - 1) * searchLimit;
    const endIndex = startIndex + searchLimit;

    let paginatedResult = filteredResult.slice(startIndex, endIndex);

    if (searchId > 0 && paginatedResult.every((item: IFichaMedica) => Number(item.id) !== searchId)) {
      const resultById = fichasMedicas.find((item: IFichaMedica) => Number(item.id) === searchId);

      if (resultById) {
        paginatedResult = [...paginatedResult, resultById];
      }
    }

    return paginatedResult.map((item: IFichaMedica) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt)
    })) as IFichaMedica[];

  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};