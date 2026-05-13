import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ICategoria } from '../../models';

export const updateById = async (id: number, categoria: Omit<ICategoria, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../15_categoria.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao atualizar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let categorias: ICategoria[] = [];

    if (fileData.trim() !== '') {
      categorias = JSON.parse(fileData);
    }

    const index = categorias.findIndex((item: ICategoria) => Number(item.id) === Number(id));

    if (index !== -1) {
      categorias[index] = {
        ...categorias[index],
        ...categoria,
        updated_at: new Date(),
      };

      writeFileSync(filePath, JSON.stringify(categorias, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
