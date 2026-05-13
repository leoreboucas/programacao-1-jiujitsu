import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IFilial } from '../../models';

export const getById = async (id: number): Promise<IFilial | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../06_filial.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let filiais: IFilial[] = [];

    if (fileData.trim() !== '') {
      filiais = JSON.parse(fileData);
    }

    const result = filiais.find((filial: IFilial) => Number(filial.id) === Number(id));

    if (result) {
      return {
        ...result,
        created_at: new Date(result.created_at),
        updated_at: new Date(result.updated_at)
      } as IFilial;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
