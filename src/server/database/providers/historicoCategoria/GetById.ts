import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IHistoricoCategoria } from '../../models';

export const getById = async (id: number): Promise<IHistoricoCategoria | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../14_historico_categoria.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let historicos: IHistoricoCategoria[] = [];

    if (fileData.trim() !== '') {
      historicos = JSON.parse(fileData);
    }

    const result = historicos.find((historico: IHistoricoCategoria) => Number(historico.id) === Number(id));

    if (result) {
      return {
        ...result,
        created_at: new Date(result.created_at),
        updated_at: new Date(result.updated_at),
      } as IHistoricoCategoria;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
