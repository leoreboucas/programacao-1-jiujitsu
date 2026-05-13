import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IContrato } from '../../models';

export const create = async (contrato: Omit<IContrato, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../13_contrato.json');
    let contratos: IContrato[] = [];

    if (existsSync(filePath)) {
      const fileData = readFileSync(filePath, 'utf-8');
      if (fileData.trim() !== '') {
        contratos = JSON.parse(fileData);
      }
    }

    const novoId = contratos.length > 0
      ? Math.max(...contratos.map((c) => Number(c.id) || 0)) + 1
      : 1;

    const dataAtual = new Date();
    const novoRegistro: IContrato = {
      ...contrato,
      id: novoId,
      created_at: dataAtual,
      updated_at: dataAtual,
    } as IContrato;

    contratos.push(novoRegistro);

    writeFileSync(filePath, JSON.stringify(contratos, null, 2), 'utf-8');

    return novoId;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};
