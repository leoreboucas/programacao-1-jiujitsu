import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IHorario } from '../../models';

export const getAll = async (page: number, limit: number, dia: string, hora: string, id = 0): Promise<IHorario[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../10_horario.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let horarios: IHorario[] = [];

    if (fileData.trim() !== '') {
      horarios = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchLimit = Number(limit);
    const searchPage = Number(page);

    const filteredResult = horarios.filter((item: IHorario) => {
      const matchId = Number(item.id) === searchId;
      const matchDia = item.dia.toLowerCase().includes(dia.toLowerCase());
      const matchHora = item.hora.toLowerCase().includes(hora.toLowerCase());

      return matchId || matchDia || matchHora;
    });

    const startIndex = (searchPage - 1) * searchLimit;
    const endIndex = startIndex + searchLimit;

    let paginatedResult = filteredResult.slice(startIndex, endIndex);

    if (searchId > 0 && paginatedResult.every((item: IHorario) => Number(item.id) !== searchId)) {
      const resultById = horarios.find((item: IHorario) => Number(item.id) === searchId);

      if (resultById) {
        paginatedResult = [...paginatedResult, resultById];
      }
    }

    return paginatedResult.map((item: IHorario) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at)
    })) as IHorario[];

  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
