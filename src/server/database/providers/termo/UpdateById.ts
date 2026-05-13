import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ITermo } from '../../models';

export const updateById = async (id: number, termo: Omit<ITermo, 'id' | 'created_at' | 'updated_at'>): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../16_termo.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao atualizar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let termos: ITermo[] = [];

    if (fileData.trim() !== '') {
      termos = JSON.parse(fileData);
    }

    const index = termos.findIndex((item: ITermo) => Number(item.id) === Number(id));

    if (index !== -1) {
      termos[index] = {
        ...termos[index],
        ...termo,
        updated_at: new Date(),
      };

      writeFileSync(filePath, JSON.stringify(termos, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
