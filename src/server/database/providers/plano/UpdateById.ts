import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { IPlano } from '../../models';

export const updateById = async (id: number, plano: Omit<IPlano, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../12_plano.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao atualizar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let planos: IPlano[] = [];

    if (fileData.trim() !== '') {
      planos = JSON.parse(fileData);
    }

    const index = planos.findIndex((item: IPlano) => Number(item.id) === Number(id));

    if (index !== -1) {
      planos[index] = {
        ...planos[index],
        ...plano,
        updated_at: new Date(),
      };

      writeFileSync(filePath, JSON.stringify(planos, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
