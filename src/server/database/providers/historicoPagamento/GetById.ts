import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { IHistoricoPagamento } from '../../models';

export const getById = async (id: number): Promise<IHistoricoPagamento | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../18_historicoPagamento.json');

    if (!existsSync(filePath)) {
      return new Error('Registro não encontrado');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let historicoPagamento: IHistoricoPagamento[] = [];

    if (fileData.trim() !== '') {
      historicoPagamento = JSON.parse(fileData);
    }

    const result = historicoPagamento.find((titulo: IHistoricoPagamento) => Number(titulo.id) === Number(id));

    if (result) {
      return {
        ...result,
        created_at: new Date(result.created_at),
        updated_at: new Date(result.updated_at)
      } as IHistoricoPagamento;
    }

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};
