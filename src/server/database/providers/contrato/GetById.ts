import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IContrato } from '../../models';

export const getById = async (id: number): Promise<IContrato | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../13_contrato.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let contratos: IContrato[] = [];

    if (fileData.trim() !== '') {
      contratos = JSON.parse(fileData);
    }

    const result = contratos.find((contrato: IContrato) => Number(contrato.id) === Number(id));

    if (result) {
      return {
        ...result,
        created_at: new Date(result.created_at),
        updated_at: new Date(result.updated_at),
      } as IContrato;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
