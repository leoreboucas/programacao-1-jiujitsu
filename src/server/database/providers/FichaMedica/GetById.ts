import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IFichaMedica } from '../../models';

export const getById = async (id: number): Promise<IFichaMedica | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../04_fichaMedica.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let fichasMedicas: IFichaMedica[] = [];

    if (fileData.trim() !== '') {
      fichasMedicas = JSON.parse(fileData);
    }

    const result = fichasMedicas.find((fichaMedica: IFichaMedica) => Number(fichaMedica.id) === Number(id));

    if (result) {
      return {
        ...result,
        createdAt: new Date(result.createdAt),
        updatedAt: new Date(result.updatedAt)
      } as IFichaMedica;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};