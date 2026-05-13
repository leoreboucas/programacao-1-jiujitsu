import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { ITurmaHorario } from '../../models';

export const getAll = async (page: number, limit: number, id = 0, idTurma = 0, idHorario = 0): Promise<ITurmaHorario[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../11_turma_horario.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let turmasHorarios: ITurmaHorario[] = [];

    if (fileData.trim() !== '') {
      turmasHorarios = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchIdTurma = Number(idTurma);
    const searchIdHorario = Number(idHorario);
    const hasFilter = searchId > 0 || searchIdTurma > 0 || searchIdHorario > 0;

    const filteredResult = hasFilter
      ? turmasHorarios.filter((item) => (
        (searchId > 0 && Number(item.id) === searchId) ||
        (searchIdTurma > 0 && Number(item.id_turma) === searchIdTurma) ||
        (searchIdHorario > 0 && Number(item.id_horario) === searchIdHorario)
      ))
      : turmasHorarios;

    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);

    return filteredResult.slice(startIndex, endIndex).map((item) => ({
      ...item,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at)
    }));
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
