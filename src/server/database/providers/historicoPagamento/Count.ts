import { readFileSync } from 'fs';
import path from 'path';
import { IHistoricoPagamento } from '../../models';

export const count = async (id = ''): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../18_historicoPagamento.json');

    const fileData = await readFileSync(filePath, 'utf-8');

    const historicoPagamento = JSON.parse(fileData);

    const registrosFiltrados = historicoPagamento.filter((usuario: IHistoricoPagamento) =>
      usuario.id.toString().includes(id.toString())
    );

    return registrosFiltrados.length;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar a quantidade total de registros');
  }
};
