import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IHistoricoPagamento } from '../../models';

export const updateById = async (id: number, historico: Omit<IHistoricoPagamento, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../18_historicoPagamento.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao atualizar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let historicoPagamento: IHistoricoPagamento[] = [];

    if (fileData.trim() !== '') {
      historicoPagamento = JSON.parse(fileData);
    }

    const index = historicoPagamento.findIndex((item: IHistoricoPagamento) => Number(item.id) === Number(id));

    if (index !== -1) {
      historicoPagamento[index] = {
        ...historicoPagamento[index],
        ...historico,
        updated_at: new Date()
      };

      writeFileSync(filePath, JSON.stringify(historicoPagamento, null, 2), 'utf-8');

      return;
    }

      return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
