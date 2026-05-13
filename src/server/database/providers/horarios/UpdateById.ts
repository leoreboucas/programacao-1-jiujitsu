import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IHorario } from '../../models';

export const updateById = async (id: number, horario: Omit<IHorario, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../10_horario.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao atualizar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let horarios: IHorario[] = [];

    if (fileData.trim() !== '') {
      horarios = JSON.parse(fileData);
    }

    const index = horarios.findIndex((item: IHorario) => Number(item.id) === Number(id));

    if (index !== -1) {
      horarios[index] = {
        ...horarios[index],
        ...horario,
        updated_at: new Date()
      };

      writeFileSync(filePath, JSON.stringify(horarios, null, 2), 'utf-8');

      return;
    }

      return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
