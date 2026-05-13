import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IPlano } from '../../models';

export const create = async (plano: Omit<IPlano, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../12_plano.json');
    let planos: IPlano[] = [];

    if (existsSync(filePath)) {
      const fileData = readFileSync(filePath, 'utf-8');
      if (fileData.trim() !== '') {
        planos = JSON.parse(fileData);
      }
    }

    const novoId = planos.length > 0
      ? Math.max(...planos.map((p) => Number(p.id) || 0)) + 1
      : 1;

    const dataAtual = new Date();
    const novoRegistro: IPlano = {
      ...plano,
      id: novoId,
      created_at: dataAtual,
      updated_at: dataAtual,
    } as IPlano;

    planos.push(novoRegistro);

    writeFileSync(filePath, JSON.stringify(planos, null, 2), 'utf-8');

    return novoId;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};
