import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ITurma } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../07_turma.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let turmas: ITurma[] = [];

    if (fileData.trim() !== '') {
      turmas = JSON.parse(fileData);
    }

    const index = turmas.findIndex((turma: ITurma) => Number(turma.id) === Number(id));

    if (index !== -1) {
      turmas.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(turmas, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};
