import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { ITitulo } from '../../models';

export const getById = async (id: number): Promise<ITitulo | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../18_titulos.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let titulos: ITitulo[] = [];

    if (fileData.trim() !== '') {
      titulos = JSON.parse(fileData);
    }

    const result = titulos.find((titulo: ITitulo) => Number(titulo.id) === Number(id));

    if (result) {
      return {
        ...result,
        created_at: new Date(result.created_at),
        updated_at: new Date(result.updated_at)
      } as ITitulo;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
