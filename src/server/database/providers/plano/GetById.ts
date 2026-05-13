import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IPlano } from '../../models';

export const getById = async (id: number): Promise<IPlano | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../12_plano.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let planos: IPlano[] = [];

    if (fileData.trim() !== '') {
      planos = JSON.parse(fileData);
    }

    const result = planos.find((plano: IPlano) => Number(plano.id) === Number(id));

    if (result) {
      return {
        ...result,
        created_at: new Date(result.created_at),
        updated_at: new Date(result.updated_at),
      } as IPlano;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
