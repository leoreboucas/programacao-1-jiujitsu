import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { ITermo } from '../../models';

export const getById = async (id: number): Promise<ITermo | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../16_termo.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let termos: ITermo[] = [];

    if (fileData.trim() !== '') {
      termos = JSON.parse(fileData);
    }

    const result = termos.find((termo: ITermo) => Number(termo.id) === Number(id));

    if (result) {
      return {
        ...result,
        created_at: new Date(result.created_at),
        updated_at: new Date(result.updated_at),
      } as ITermo;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
