import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ITurmaHorario } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../11_turma_horario.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let turmasHorarios: ITurmaHorario[] = [];

    if (fileData.trim() !== '') {
      turmasHorarios = JSON.parse(fileData);
    }

    const index = turmasHorarios.findIndex((item) => Number(item.id) === Number(id));

    if (index !== -1) {
      turmasHorarios.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(turmasHorarios, null, 2), 'utf-8');
      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};
