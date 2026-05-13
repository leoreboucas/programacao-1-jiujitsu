import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ITurma } from '../../models';

export const updateById = async (id: number, turma: Omit<ITurma, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../07_turma.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao atualizar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let turmas: ITurma[] = [];

    if (fileData.trim() !== '') {
      turmas = JSON.parse(fileData);
    }

    const index = turmas.findIndex((item: ITurma) => Number(item.id) === Number(id));

    if (index !== -1) {
      turmas[index] = {
        ...turmas[index],
        ...turma,
        updated_at: new Date()
      };

      writeFileSync(filePath, JSON.stringify(turmas, null, 2), 'utf-8');

      return;
    }

      return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
