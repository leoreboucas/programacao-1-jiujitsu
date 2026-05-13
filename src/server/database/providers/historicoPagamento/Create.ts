import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IHistoricoPagamento } from '../../models';

export const create = async (favorito: Omit<IHistoricoPagamento, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
    try {
      const filePath = path.resolve(__dirname, '../../../../../18_historicoPagamento.json');
      let historicoPagamento: IHistoricoPagamento[] = [];

      if (existsSync(filePath)) {
        const fileData = readFileSync(filePath, 'utf-8');
        if (fileData.trim() !== '') {
          historicoPagamento = JSON.parse(fileData);
        }
      }

      const novoId = historicoPagamento.length > 0
        ? Math.max(...historicoPagamento.map((f) => Number(f.id) || 0)) + 1
        : 1;


      const dataAtual = new Date();
      const novoRegistro: IHistoricoPagamento = {
        ...favorito,
        id: novoId,
        created_at: dataAtual,
        updated_at: dataAtual,
      } as IHistoricoPagamento;

      historicoPagamento.push(novoRegistro);

      await writeFileSync(filePath, JSON.stringify(historicoPagamento, null, 2), 'utf-8');

      return novoId;
    } catch (error) {
      console.log(error);
      return new Error('Erro ao cadastrar o registro');
    }
};
