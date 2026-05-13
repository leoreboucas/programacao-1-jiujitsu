import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IHistoricoCategoria } from '../../models';

export const create = async (historico: Omit<IHistoricoCategoria, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../14_historico_categoria.json');
    let historicos: IHistoricoCategoria[] = [];

    if (existsSync(filePath)) {
      const fileData = readFileSync(filePath, 'utf-8');
      if (fileData.trim() !== '') {
        historicos = JSON.parse(fileData);
      }
    }

    const novoId = historicos.length > 0
      ? Math.max(...historicos.map((h) => Number(h.id) || 0)) + 1
      : 1;

    const dataAtual = new Date();
    const novoRegistro: IHistoricoCategoria = {
      ...historico,
      id: novoId,
      created_at: dataAtual,
      updated_at: dataAtual,
    } as IHistoricoCategoria;

    historicos.push(novoRegistro);

    writeFileSync(filePath, JSON.stringify(historicos, null, 2), 'utf-8');

    return novoId;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};
