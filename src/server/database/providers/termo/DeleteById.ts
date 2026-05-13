import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { ITermo } from '../../models';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const filePath = path.resolve(__dirname, '../../../../../16_termo.json');

    if (!existsSync(filePath)) {
      return new Error('Erro ao apagar o registro');
    }

    const fileData = readFileSync(filePath, 'utf-8');
    let termos: ITermo[] = [];

    if (fileData.trim() !== '') {
      termos = JSON.parse(fileData);
    }

    const index = termos.findIndex((termo: ITermo) => Number(termo.id) === Number(id));

    if (index !== -1) {
      termos.splice(index, 1);
      writeFileSync(filePath, JSON.stringify(termos, null, 2), 'utf-8');

      return;
    }

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};
