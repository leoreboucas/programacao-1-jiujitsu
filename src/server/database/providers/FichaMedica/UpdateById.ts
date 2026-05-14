import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IFichaMedica } from '../../models';

export const updateById = async (id: number, fichaMedica: Omit<IFichaMedica, 'id' | 'createdAt' | 'updatedAt'>): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../04_fichaMedica.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao atualizar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let fichasMedicas: IFichaMedica[] = [];

    if (fileData.trim() !== '') {
      fichasMedicas = JSON.parse(fileData);
    }

    const index = fichasMedicas.findIndex((item: IFichaMedica) => Number(item.id) === Number(id));

    if (index !== -1) {
      fichasMedicas[index] = {
        ...fichasMedicas[index],
        ...fichaMedica,
        updatedAt: new Date()
      };

      writeFileSync(filePath, JSON.stringify(fichasMedicas, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};