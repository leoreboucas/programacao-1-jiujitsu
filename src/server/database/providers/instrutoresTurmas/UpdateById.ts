import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IInstrutorTurma } from '../../models';

export const updateById = async (id: number, instrutorTurma: Omit<IInstrutorTurma, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../09_instrutor_turma.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao atualizar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let instrutoresTurmas: IInstrutorTurma[] = [];

    if (fileData.trim() !== '') {
      instrutoresTurmas = JSON.parse(fileData);
    }

    const index = instrutoresTurmas.findIndex((item) => Number(item.id) === Number(id));

    if (index !== -1) {
      instrutoresTurmas[index] = {
        ...instrutoresTurmas[index],
        ...instrutorTurma,
        updated_at: new Date()
      };

      writeFileSync(filePath, JSON.stringify(instrutoresTurmas, null, 2), 'utf-8');
      return;
    }

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
