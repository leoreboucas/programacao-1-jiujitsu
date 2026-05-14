import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IFichaMedica } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../04_fichaMedica.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let fichasMedicas: IFichaMedica[] = [];

    if (fileData.trim() !== '') {
      fichasMedicas = JSON.parse(fileData);
    }

    const index = fichasMedicas.findIndex((fichaMedica: IFichaMedica) => Number(fichaMedica.id) === Number(id));

    if (index !== -1) {
      fichasMedicas.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(fichasMedicas, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};