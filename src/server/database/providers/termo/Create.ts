import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ITermo } from '../../models';

export const create = async (termo: Omit<ITermo, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../16_termo.json');
    let termos: ITermo[] = [];

    if (existsSync(filePath)) {
      const fileData = readFileSync(filePath, 'utf-8');
      if (fileData.trim() !== '') {
        termos = JSON.parse(fileData);
      }
    }

    const novoId = termos.length > 0
      ? Math.max(...termos.map((t) => Number(t.id) || 0)) + 1
      : 1;

    const dataAtual = new Date();
    const novoRegistro: ITermo = {
      ...termo,
      id: novoId,
      created_at: dataAtual,
      updated_at: dataAtual,
    } as ITermo;

    termos.push(novoRegistro);

    writeFileSync(filePath, JSON.stringify(termos, null, 2), 'utf-8');

    return novoId;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};
