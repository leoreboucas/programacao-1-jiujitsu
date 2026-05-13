import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IInstrutorTurma } from '../../models';

export const getAll = async (page: number, limit: number, id = 0, idInstrutor = 0, idTurma = 0): Promise<IInstrutorTurma[] | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../09_instrutor_turma.json');

    if (!existsSync(filePath)) {
      return [];
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let instrutoresTurmas: IInstrutorTurma[] = [];

    if (fileData.trim() !== '') {
      instrutoresTurmas = JSON.parse(fileData);
    }

    const searchId = Number(id);
    const searchIdInstrutor = Number(idInstrutor);
    const searchIdTurma = Number(idTurma);
    const hasFilter = searchId > 0 || searchIdInstrutor > 0 || searchIdTurma > 0;

    const filteredResult = hasFilter
      ? instrutoresTurmas.filter((item) => (
        (searchId > 0 && Number(item.id) === searchId) ||
        (searchIdInstrutor > 0 && Number(item.id_instrutor) === searchIdInstrutor) ||
        (searchIdTurma > 0 && Number(item.id_turma) === searchIdTurma)
      ))
      : instrutoresTurmas;

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
