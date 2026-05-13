import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IInstrutorTurma } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../09_instrutor_turma.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let instrutoresTurmas: IInstrutorTurma[] = [];

    if (fileData.trim() !== '') {
      instrutoresTurmas = JSON.parse(fileData);
    }

    const index = instrutoresTurmas.findIndex((item) => Number(item.id) === Number(id));

    if (index !== -1) {
      instrutoresTurmas.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(instrutoresTurmas, null, 2), 'utf-8');
      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};
