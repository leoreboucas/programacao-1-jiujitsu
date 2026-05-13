import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IInstrutorTurma } from '../../models';

export const count = async (id = ''): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../09_instrutor_turma.json');

    if (!existsSync(filePath)) {
      return 0;
    }

    const fileData = readFileSync(filePath, 'utf-8');
    const instrutoresTurmas: IInstrutorTurma[] = fileData.trim() !== '' ? JSON.parse(fileData) : [];

    return instrutoresTurmas.filter((item) => item.id.toString().includes(id.toString())).length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
