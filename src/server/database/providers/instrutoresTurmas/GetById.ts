import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IInstrutorTurma } from '../../models';

export const getById = async (id: number): Promise<IInstrutorTurma | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../09_instrutor_turma.json');

    if (!existsSync(filePath)) {
      return new Error('Registro nao encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let instrutoresTurmas: IInstrutorTurma[] = [];

    if (fileData.trim() !== '') {
      instrutoresTurmas = JSON.parse(fileData);
    }

    const result = instrutoresTurmas.find((item) => Number(item.id) === Number(id));

    if (result) {
      return {
        ...result,
        created_at: new Date(result.created_at),
        updated_at: new Date(result.updated_at)
      };
    }

    return new Error('Registro nao encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
