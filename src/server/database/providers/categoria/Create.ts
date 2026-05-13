import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ICategoria } from '../../models';

export const create = async (categoria: Omit<ICategoria, 'id' | 'created_at' | 'updated_at'>): Promise<number | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../15_categoria.json');
    let categorias: ICategoria[] = [];

    if (existsSync(filePath)) {
      const fileData = readFileSync(filePath, 'utf-8');
      if (fileData.trim() !== '') {
        categorias = JSON.parse(fileData);
      }
    }

    const novoId = categorias.length > 0
      ? Math.max(...categorias.map((c) => Number(c.id) || 0)) + 1
      : 1;

    const dataAtual = new Date();
    const novoRegistro: ICategoria = {
      ...categoria,
      id: novoId,
      created_at: dataAtual,
      updated_at: dataAtual,
    } as ICategoria;

    categorias.push(novoRegistro);

    writeFileSync(filePath, JSON.stringify(categorias, null, 2), 'utf-8');

    return novoId;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};
