import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IHistoricoPagamento } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../18_historicoPagamento.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let historicoPagamento: IHistoricoPagamento[] = [];

    if (fileData.trim() !== '') {
      historicoPagamento = JSON.parse(fileData);
    }

    const index = historicoPagamento.findIndex((titulo: IHistoricoPagamento) => Number(titulo.id) === Number(id));

    if (index !== -1) {
      historicoPagamento.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(historicoPagamento, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};
