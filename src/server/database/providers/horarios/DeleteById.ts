import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IHorario } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../10_horario.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let horarios: IHorario[] = [];

    if (fileData.trim() !== '') {
      horarios = JSON.parse(fileData);
    }

    const index = horarios.findIndex((horario: IHorario) => Number(horario.id) === Number(id));

    if (index !== -1) {
      horarios.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(horarios, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};
