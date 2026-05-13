import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { ITurma } from '../../models';

export const getById = async (id: number): Promise<ITurma | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../07_turma.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let turmas: ITurma[] = [];

    if (fileData.trim() !== '') {
      turmas = JSON.parse(fileData);
    }

    const result = turmas.find((turma: ITurma) => Number(turma.id) === Number(id));

    if (result) {
      return {
        ...result,
        created_at: new Date(result.created_at),
        updated_at: new Date(result.updated_at)
      } as ITurma;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
