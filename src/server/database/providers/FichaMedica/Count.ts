import { readFileSync } from 'fs';
import path from 'path';
import { IFichaMedica } from '../../models';

export const count = async (id = ''): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../04_fichaMedica.json');

    const fileData = await readFileSync(filePath, 'utf-8');

    const fichasMedicas = JSON.parse(fileData);

    const registrosFiltrados = fichasMedicas.filter((fichaMedica: IFichaMedica) =>
      fichaMedica.id.toString().includes(id)
    );

    return registrosFiltrados.length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};